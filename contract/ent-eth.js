/**
 * @auther zhouzibo
 * @date 2021/2/9
 * @license Copyright (c) 2018 那镁克
 */
const config = require('../config/base-config')
const contract = config.contract
const entEth = contract.eth.ent
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.WebsocketProvider(entEth.networkUrl))
const entEthAbi = require('../config/eth-ent-contract-abi').abi
const construct = {
    initEntEthContract: initEntEthContract
}

function initEntEthContract() {
    const entEthContract = new web3.eth.Contract(entEthAbi, entEth.address)
    return entEthContract
}

module.exports = construct
