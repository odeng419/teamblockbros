var Web3 = require('web3')
var web3 = new Web3()

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8042'))

var contractAddress = '0x2eecf5943bb65a83b4a7b443f1a717bc4efdb108'

var ABI = JSON.parse('[{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"depositToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"recipient","type":"address"}],"name":"getTokens","outputs":[{"name":"value","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getTime","outputs":[{"name":"nTime","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"OnValueChanged","type":"event"}]')

var contract = web3.eth.contract(ABI).at(contractAddress)


//sendFunds
function sendFunds(buyerAddress, ticketPrice) {
	contract.depositToken(0x67ac76a12addf96f73cee111705daaf36678ecf6, ticketPrice, {from: buyerAddress, gas: 100000})
	/*
	myConferenceInstance.buyTicket({ from: buyerAddress, value: ticketPrice }).then(
		function() {
			return myConferenceInstance.numRegistrants.call();
		}).then(
		function(num) {
			$("#numRegistrants").html(num.toNumber());
			return myConferenceInstance.registrantsPaid.call(buyerAddress);
		}).then(
		function(valuePaid) {
			var msgResult;
			if (valuePaid.toNumber() == ticketPrice) {
				msgResult = "Purchase successful";
			} else {
				msgResult = "Purchase failed";
			}
			$("#buyTicketResult").html(msgResult);
		});
	*/
}

window.onload = function() {

	web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    accounts = accs;
    account = accounts[0];

  	//initializeConference();
  });

	// Wire up the UI elements

	$("#sendFunds").click(function() {
		var val = $("#payAmount").val();
		var buyerAddress = $("#buyerAddress").val();
		buyTicket(buyerAddress, web3.toWei(val));
	});

	// Set value of wallet to accounts[1]
	$("#buyerAddress").val(accounts[1]);
	$("#refBuyerAddress").val(accounts[1]);

};
