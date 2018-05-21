
import Api from '.'

import * as tenancyService from '../service/tenancy-service'
import { TenancyUser } from '../model/tenancy'
import { Profile } from '../model/user'

import * as express from 'express'
import { sendHttpResponse } from '../utils/errors';

const URI = '/tenancies'

const fromUserId = (req, res, next) => {
    const userId = req.params.userId
    tenancyService.fromUserId(userId)
        .then(tenancies => res.json(tenancies))
        .catch(err => sendHttpResponse(err, res, next))
}

const save = (req, res, next) => {
    const name = req.body.name
    const metadata = req.body.metadata
    const owner = req.params.userId
    tenancyService.newSimpleTenancy(name, metadata, [new TenancyUser(owner, Profile.OWNER)])
    .then(tenancy => res.json(tenancy))
    .catch(err => sendHttpResponse(err, res, next))
}

class TenancyApi implements Api {
    routes() {
        return express.Router()
            .post('/:userId', save)
            .get('/:userId', fromUserId)
    }
}

const api = new TenancyApi()

export default server => server.use(URI, api.routes())
