
import Api from '.'

import * as express from 'express'

const URI = '/support'

class SupportApi implements Api {
    routes() {
        return express.Router()
            .get('/health', (req, res, next) => {
                res.json({ health: 'OK' })
            })
            .get('/ping', (req, res, next) => {
                res.json({ result: 'pong' })
            })
            .get('/echo/:echo', (req, res, next) => {
                res.json({ result: req.params.echo })
            })
    }
}

const api = new SupportApi()

export default server => server.use(URI, api.routes())
