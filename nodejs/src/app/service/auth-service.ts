
import logger from '../log'

import * as profileService from './profile-service'
import * as crypt from '../utils/crypto'
import * as jwt from '../utils/jwt'

import { post } from './camunda-service'

import { merge, inspect } from '../utils/objects'
import { User, Session } from '../model/user'
import { newInvalidParameters, newRequiredParameters } from '../utils/errors'

const verifyToken = token => jwt.verify(token)
  
const newUser = (name: string, email: string, password: string, photoUrl: string = null, 
        providerId: string = null): Promise<User> => new Promise((resolve, reject) => {

    if (!name || !email || !password) { 
        return reject(newRequiredParameters(`name=${name} email=${email} password=${password}`)) 
    }

    const toInsert = new User()
    toInsert._id = email
    toInsert.name = name
    toInsert.password = crypt.encode(password)
    toInsert.providerId = providerId || 'system'
    toInsert.photoUrl = photoUrl || 'http://www.gravatar.com/avatar/?d=mysteryman&s=50'
    toInsert.session = new Session()
    delete toInsert._rev

    logger.info(`Register new user=${inspect(toInsert)}`)

    return Promise.resolve(toInsert)
})

const login = (username, password, tenancyId: string = null) =>
    post('/identity/verify', { username: username, password: password })
        .then(data => {
            logger.debug(`Login OK returning JWT sign data=${inspect(data)}!`)
            return jwt.sign({
                user: data.authenticatedUser,
                authenticated: data.authenticated
            })
            .catch(err => newInvalidParameters(`JWT sign username=${username} error=${inspect(err)}`))
        })

export { 
    login, 
    newUser, 
    verifyToken 
}
