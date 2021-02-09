/**
 * @auther zhouzibo
 * @date 2021/2/9
 * @license Copyright (c) 2018 那镁克
 */
const config = require('../config/base-config')
const basics = config.basics
const log4j = require('log4js')
log4j.configure({
    appenders: { convert: { type: "file", filename: basics.eventLogPath } },
    categories: { default: { appenders: ["convert"], level: "info" } }
})

const logger = log4j.getLogger("convert")

module.exports = logger
