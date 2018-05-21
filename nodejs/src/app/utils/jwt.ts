
import * as jwt from 'jsonwebtoken'
import * as config from 'config'

import { newUnauthorized } from '../utils/errors'
import { encode } from '../utils/crypto'

const jwtSecret = config.has('jwt.secret') ? config.get('jwt.secret') : 'camunda-node-external-secret-prime(115)'
const secret = encode(jwtSecret)

const sign = data => new Promise((resolve, reject) => 
    jwt.sign({
        data: data,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, secret, (err, encoded) => {
        if (err) reject(newUnauthorized(err))
        else resolve(encoded)
    }))

const verify = token => new Promise((resolve, reject) =>
    jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(newUnauthorized(err))
        else resolve(decoded)
    }))

export { sign, verify }
