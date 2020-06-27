const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/b8c38daff38c440d90c3a6bedf368579')

const account1 = '0x09E78Ec232C168ec6ef420675F813C4719A811f8' 

const privateKey1 = Buffer.from('3D84D21DD7B6AC5F0B3BFEB35BB05ACB4F70F7B462AAB72B531F6D78B090486E', 'hex')

// Read the deployed contract - get the addresss from Etherscan
const contractAddress = '0x208ae3a3ed6b16545acd8e0893f4b9f62e9e7d4d'

const contractABI = 
      [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retreive",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, contractAddress)

web3.eth.getTransactionCount(account2, (err, txCount) => {
    let txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(80000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        data: contract.methods.store(10).encodeABI()
    }

    const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' });
    tx.sign(privateKey1) 

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash = ', txHash);
    });
});

contract.methods.retrieve().call((err, number) => {
    console.log('Number= ' , number)
})
