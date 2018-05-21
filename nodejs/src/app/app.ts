
import server from './server'
import authApi from './api/auth-api'
import supportApi from './api/support-api'
import { filter } from './api/auth-filter'

import * as path from 'path'
import * as express from 'express'

const assets = server => server.use(
    express.static(
        path.join(path.resolve(), '/assets')))

export default server(express())
    .map(assets)
    .map(filter)
    .map(supportApi)
    .map(authApi)
