
import * as config from 'config'

import logger from '../log'
import option from '../utils/option'

import * as authService from '../service/auth-service'

import { inspect } from '../utils/objects'
import { sendHttpResponse } from '../utils/errors'

const unless = ['/auth/register', '/auth', '/support']

const getToken = header => {
    const result = option(header)
        .filter(header => header.split(' ')[0] === 'Bearer')
        .map(header => header.split(' ')[1])
        .map(header => header.replace(/^JWT\s/, ''))
        .orElse('')
    logger.debug(`getToken from header=${header} result=${result}`)
    return result
}

const header = option(config.get('jwt.header'))
        .map(header => header.toLowerCase())
        .orElse('authorization')

const extractHeader = req => {
    logger.debug(`Extract token from header=${header} into req.headers=${inspect(req.headers)}`)
    return req.headers[header]
}

const isUnless = path => unless.indexOf(path) > -1 
                        || unless.some(uri => path.indexOf(uri) > -1) 
                        //|| process.env.NODE_ENV === 'development'

/* public */
const decodedToken = req => {
    const token = getToken(extractHeader(req))
    return authService.verifyToken(token)
}

const filter = server => server.use((req, res, next) => {
    const path = req.originalUrl
    logger.debug(`Auth filter to path=${path}`)

    if (isUnless(path)) {
        logger.debug(`Auth filter is unless to req.path=${path}`)
        next()
    } else {
        logger.debug(`Auth filter will verify token to req.path=${path}`)
        decodedToken(req)
        .then(decoded =>  next())
        .catch(err => sendHttpResponse(err, res, next))
    }
})

export { decodedToken, filter }
