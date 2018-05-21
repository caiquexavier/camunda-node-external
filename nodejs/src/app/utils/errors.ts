
import { inspect } from '../utils/objects'

interface Errors {
    id: string
    code: number
    message: string
    next: Errors
}

class NotFound implements Errors {
    readonly id: string = 'NOT_FOUND' 
    readonly code: number = 404
    readonly message: string = ''
    readonly next: Errors = null

    constructor(message: string, next: Errors = null) {
        this.message = message
        this.next = next
    }
}

class RequiredParameters implements Errors {
    readonly id: string = 'BAD_REQUEST_REQUIRED_PARAMS' 
    readonly code: number = 400
    readonly message: string = ''
    readonly next: Errors = null

    constructor(message: string, next: Errors = null) {
        this.message = message
        this.next = next
    }
}

class InvalidParameters implements Errors {
    readonly id: string = 'BAD_REQUEST_INVALID_PARAMS' 
    readonly code: number = 400
    readonly message: string = ''
    readonly next: Errors = null

    constructor(message: string, next: Errors = null) {
        this.message = message
        this.next = next
    }
}

class BadRequestGateway implements Errors {
    readonly id: string = 'BAD_REQUEST_GATEWAY' 
    readonly code: number = 400
    readonly message: string = ''
    readonly next: Errors = null

    constructor(message: string, next: Errors = null) {
        this.message = message
        this.next = next
    }
}

class Unauthorized implements Errors {
    readonly id: string = 'UNAUTHORIZED' 
    readonly code: number = 401
    readonly message: string = ''
    readonly next: Errors = null

    constructor(message: string, next: Errors = null) {
        this.message = message
        this.next = next
    }
}

class ServerError implements Errors {
    readonly id: string = 'SERVER_ERROR' 
    readonly code: number = 500
    readonly message: string = ''
    readonly next: Errors = null

    constructor(message: string, next: Errors = null) {
        this.message = message
        this.next = next
    }
}

const newNotFound = (name, key, value?) => 
    new NotFound(`Not Found resource="${name}" to="${key}" value="${value}"`)


const newRequiredParameters = params =>
        new RequiredParameters(`Any parameters are empty: params="${params}"`)

const newInvalidParameters = params => 
    new InvalidParameters(`Invalid parameters ${params}`)

const newUnauthorized = err => 
    new Unauthorized(`Unauthorized error=${inspect(err)}`)

const newServerError = err => new ServerError(`Internal Server Error=${inspect(err)}`)

const sendHttpResponse = (err: Errors, res, next) => {
    res.status(err.code).json(err)
    next()
}

export {
    newNotFound,
    newRequiredParameters,
    newInvalidParameters, 
    sendHttpResponse, 
    newUnauthorized,
    newServerError
}
