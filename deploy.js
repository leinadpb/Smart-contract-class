
require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const infura = process.env.INFURA_URL;
const key = process.env.ACCOUNT_MNEMONIC;

const provider = new HDWalletProvider(key, infura);

const web3 = new Web3(provider);

const deploy = async () => {
  // Available accounts
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);

  const contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!']
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    })

  console.log(contract.options.address);

}


console.log('WILL CALL FUNCTION >>>>>');
deploy();