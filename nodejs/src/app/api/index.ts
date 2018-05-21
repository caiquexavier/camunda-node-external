
import * as express from 'express'

export default interface Api {
    routes(): express.Router
}
