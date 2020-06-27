var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/b8c38daff38c440d90c3a6bedf368579')

const account1 = '0x09E78Ec232C168ec6ef420675F813C4719A811f8'

const privateKey1 = Buffer.from('3D84D21DD7B6AC5F0B3BFEB35BB05ACB4F70F7B462AAB72B531F6D78B090486E', 'hex')


// Deploy the contract
web3.eth.getTransactionCount(account1, (err, txCount) => {
  const data = '0x608060405234801561001057600080fd5b5060c78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636057361d146037578063b05784b8146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea2646970667358221220be5823d50fd48ab58b3251892c327ef78ae8f414e32e6783edc8c0a7c9c3699364736f6c63430006060033', 
'

const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    data: data
  }

  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
  })
})
