const logger = require('./common/logger')
const entAqua = require('./contract/ent-aqua')
const entEth = require('./contract/ent-eth')
start().catch(error => {
    logger.error(`handle event execute error`)
    logger.error(error)
})

async function start() {
    logger.info(`handle cross transfer and revert start`)
    const entAquaContract = await entAqua.initContractPromise()
    const entEthContract = entEth.initEntEthContract()
    // TODO: query last block number
    const lastBlockNumber = 0
    entEthContract.events.CrossTransfer({
        fromBlock: lastBlockNumber
    }, function(error, event){
        if (error) {
            logger.error(`crossTransfer event error`)
            logger.error(error)
        } else {
            // TODO: save event
            entAqua.contractTransfer(entAquaContract,
                "5DEHwZaCjMTh5qggboRUmzgck3vetBXhnCJsbVEaLRhi39xZ",
                event.returnValues.value)
            .then(hash => {
                // TODO: set hash for event
            }).catch(error => {
                // TODO: set error state for event
            })
        }
    })

}
