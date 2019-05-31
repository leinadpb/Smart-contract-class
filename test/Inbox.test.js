const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let account = undefined;
let inbox = undefined;
const initialValue = 'Hi there!';

describe('Inbox contract', () => {


  beforeEach( async() => {
    const unlockedAccounts = await web3.eth.getAccounts();
    account = unlockedAccounts[0];
  
    // Deploy
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: bytecode,
        arguments: [
          initialValue
        ],
      }).send({
        from: account,
        gas: '1000000',
      });
  });

  it('Deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has initial value equals to default', async () => {
    const messageValue = await inbox.methods.message().call();
    assert.equal(initialValue, messageValue);
  });
  it('set message value to \'new value\' ', async () => {
    await inbox.methods.setMessage('new value').send({
      from: account,
      to: account,
      gas: '1000000',
    });
    const messageValue = await inbox.methods.message().call();
    assert.equal('new value', messageValue);
  });
});