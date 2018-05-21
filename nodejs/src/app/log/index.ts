
import { merge } from '../utils/objects'

import * as config from 'config'

const winston = require('winston')
const morgan = require('morgan')

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File) ({
            level: config.get('logger.file.level'),
            filename: config.get('logger.file.path'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new (winston.transports.Console) ({
            level: config.get('logger.console.level'),
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
})

logger.stream = {
    write: (message, encoding) => logger.info(message)
}

const createMorgan = () => morgan('combined', { stream: logger.stream })

export default merge(logger, { morgan: createMorgan })
