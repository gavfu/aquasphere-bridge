const _ = require('lodash')
const CommonUtils = {
  sleep: sleep
}

function sleep (time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

module.exports = CommonUtils
