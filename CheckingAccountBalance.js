const Web3 = require('web3')
const rpcURL = 'https://ropsten.infura.io/v3/b8c38daff38c440d90c3a6bedf368579' // Your RPC URL goes here
const web3 = new Web3(rpcURL)
const address = '0x35fD561D225dd0a2a446cdaB23723C8E9c324157' // Your account address goes here
web3.eth.getBalance(address, (err, wei) => {
  balance = web3.utils.fromWei(wei, 'ether')
})
