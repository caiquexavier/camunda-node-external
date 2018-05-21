
import logger from '../log'
import option from '../utils/option'

import { merge, inspect } from '../utils/objects'

import * as ip from 'ip'
import * as config from 'config'
import * as error from 'errorhandler'
import * as moment from 'moment'

import * as cors from 'cors'
import * as helmet from 'helmet'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

const DEFAULT_PORT = '4000'
const DEFAULT_ENV = 'development'

process.env.NODE_ENV = process.env.NODE_ENV || DEFAULT_ENV
process.env.PORT = process.env.PORT || DEFAULT_PORT

const _unknown = {
    name: 'unknown'
}

const _env = {
    profile: process.env.NODE_ENV,
    user: process.env.USER,
    lang: process.env.LANG,
    port: process.env.PORT,
    ip: ip.address(),
}

const _config = config.has('server') ? config.get('server'): _unknown

const listen = server => {
    const instance = server.listen(process.env.PORT, 
        () => logger.info(
            `Server listen on ${ip.address()}:${process.env.PORT} start up at ${moment().toISOString()}`))

    return merge(server, { instance: instance })
}

const mixinEnv = server => merge(server, { env: _env })

const mixinInfo = server => merge(server, { info: _config })

const start = server => {
    server = mixinEnv(mixinInfo(listen(server)))

    logger.silly(`Server: ${inspect(server)}`)
    logger.debug(`Server env: ${inspect(server.env)}`)

    return server
}

export { DEFAULT_PORT, DEFAULT_ENV }

export default httpServer => option(httpServer)
    .map(server => start(server))
    .map(server => server.use(error()))
    .map(server => server.use(cors()))
    .map(server => server.use(helmet()))
    .map(server => server.use(cookieParser()))
    .map(server => server.use(logger.morgan()))
    .map(server => server.use(bodyParser.json()))
    .map(server => server.use(bodyParser.urlencoded({
        extended: true
    })))
