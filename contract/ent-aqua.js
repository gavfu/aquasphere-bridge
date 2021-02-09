/**
 * @auther zhouzibo
 * @date 2021/2/9
 * @license Copyright (c) 2018 那镁克
 */
const config = require('../config/base-config')
const contract = config.contract
const entAqua = contract.aqua.ent
const {ApiPromise, WsProvider, Keyring} = require('@polkadot/api')
const entAquaAbi = require('../config/aqua-ent-metadata')
const { ContractPromise }= require('@polkadot/api-contract')
const keyring = new Keyring({ type: entAqua.cryptoType})
const logger = require('../common/logger')
const obj = {
    initContractPromise: initContractPromise,
    contractTransfer: contractTransfer
}

async function initContractPromise () {
    logger.info(`create ent-aqua apiPromise start`)
    const wsProvider = new WsProvider(entAqua.networkUrl)
    logger.info(`create ent-aqua apiPromise`)
    const apiPromise = await ApiPromise.create({ provider: wsProvider, types: { Address: 'AccountId', LookupSource: 'AccountId', PeerId: 'Vec<u8>'} })
    await apiPromise.isReady
    logger.info(`create ent-aqua apiPromise connected`)
    const aquaContract = new ContractPromise(apiPromise, entAquaAbi, entAqua.address)
    return aquaContract
}

async function contractTransfer (contract, to, amount) {
    logger.info(`contract ent-aqua transfer to: ${to} amount: ${amount}`)
    const poolPair = keyring.addFromUri(entAqua.poolPhrase)
    const transfer = await contract.tx.transfer(0, -1, to, amount * entAqua.decimal)
    const hash = await transfer.signAndSend(poolPair)
    logger.info(`contract ent-aqua transfer success hash: ${hash}`)
    return hash
}


module.exports = obj
