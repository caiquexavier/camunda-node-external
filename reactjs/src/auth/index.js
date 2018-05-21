
import option from '../shared/option'

import { get, post } from '../shared/http'
import { encode, decode, tokenKeyHashed } from '../shared/crypto'

/** private */
const setToken = tokenHashed =>
    localStorage.setItem(tokenKeyHashed, tokenHashed)

const delToken = () => 
    localStorage.removeItem(tokenKeyHashed)

const getToken = () =>
    option(localStorage.getItem(tokenKeyHashed))
        .map(tokenHashed => decode(tokenHashed))
        .orElse(null)

const authenticate = res =>
    option(res)
        .map(t => encode(t))
        .map(t => {
            setToken(t)
            return t
        })
        .orElse(null)

const unauthenticate = () =>
    delToken()

/** public */
const signin = body =>
    post('/auth/login', body)
        .then(res => authenticate(res))

const signout = () =>
    get('/auth/logout')
        .then(res => unauthenticate()) 

const authenticated = () =>
    option(getToken())
        .map(token => true)
        .orElse(false)

const me = () => 
    get('/auth/me', getToken())

export { signin, signout, authenticated, me }
