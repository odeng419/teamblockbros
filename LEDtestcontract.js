// Interaction with GPIO
var Gpio = require('onoff').Gpio

// Interaction with Ethereum
var Web3 = require('web3')
var web3 = new Web3()

// connect to the local node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8042'))

// The contract that we are going to interact with
var contractAddress = '0x2eecf5943bb65a83b4a7b443f1a717bc4efdb108'

// Define the ABI (Application Binary Interface)
var ABI = JSON.parse('[{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"depositToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"recipient","type":"address"}],"name":"getTokens","outputs":[{"name":"value","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getTime","outputs":[{"name":"nTime","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"OnValueChanged","type":"event"}]')

// contract object

var contract = web3.eth.contract(ABI).at(contractAddress)

// components connected to the RPi
var greenLed = new Gpio(14, 'out')
var redLed = new Gpio(15, 'out')
var button = new Gpio(18, 'in', 'rising')


// display initial state
showStatus()


// watch event on the button
button.watch(function (err, value) {
 if (err) {
 throw err
 }

 showStatus()
})


// wait for an event triggered on the Smart Contract******
// Use web3.fromWei(eth.getBalance(web3.eth.accounts[0]),"ether")
var onValueChanged = contract.OnValueChanged({from: web3.eth.accounts[0]});

onValueChanged.watch(function(error, result) {
 if (error) {
 throw error
 }
 
 showStatus()
})


// power the LED according the value of the token
function showStatus() {
 
 // retrieve the value of the token
 var time = contract.getTime()

 // display the LED according the value of the token
 greenLed.writeSync(1)
 redLed.writeSync(0) 

 
 setTimeout(function () {
 greenLed.writeSync(0)
 redLed.writeSync(1)
 }, time);

}


// release process
process.on('SIGINT', function () {
 greenLed.unexport()
 redLed.unexport()
 button.unexport()
})
