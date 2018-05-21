
import logger from '../log'

import {
    Tenancy,
    TenancyUser
} from '../model/tenancy'

import {
    newNotFound,
    newRequiredParameters,
    newServerError
} from '../utils/errors'

import { inspect } from '../utils/objects'

const findById = (id): Promise<Tenancy> => new Promise((resolve, reject) => {
    if (!id) {
        return reject(newRequiredParameters(`id="${id}"`))
    }

    return Promise.resolve(new Tenancy())
})

const newSimpleTenancy = (name: string, metadata: any, users: TenancyUser[]): Promise<Tenancy> => 
    newTenancy(name, metadata, users, null, null, null)

const newTenancy = (name: string, metadata: any, users: TenancyUser[], products: string[], 
    prices: string[], photoUrl: string): Promise<Tenancy> => new Promise((resolve, reject) => {
        const toInsert: Tenancy = new Tenancy()
        toInsert.name = name
        toInsert.users = users || []
        toInsert.photoUrl = photoUrl || 'http://www.gravatar.com/avatar/?d=mysteryman&s=50'
        toInsert.metadata = metadata || {  }
        delete toInsert._rev

        return Promise.resolve(toInsert)
    })

const fromUserId = (userId: string): Promise<Tenancy[]> => new Promise((resolve, reject) => {
    return Promise.resolve([])
})

export { fromUserId, newTenancy, newSimpleTenancy, findById }
