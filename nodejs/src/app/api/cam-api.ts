
import * as express from 'express'

import Api from '.'
import logger from '../log'

import * as camundaService from '../service/camunda-service'
import * as uuid from 'uuid'

import { sendHttpResponse } from '../utils/errors';

const URI = '/cam'

const deployOrderProcess = (req, res, next) => {
    camundaService.deploy('../config/orderProcess.bpmn')
        .then(r => res.status(200).json(r))
        .catch(e => {
            console.log('>>>>>>>> error', e)
            res.status(500).json(e)
        })
}

const checkout = (req, res, next) => {
    const params = req.body.params || [ { name: 'Apple', amount: 5 }, { name: 'Banana', amount: 1 } ]
    camundaService.post('/process-definition/key/orderProcess/start', {
        variables: {
            goods: {
                value: JSON.stringify(params),
                type: 'Json'
            }
        }})
        .then(r => res.status(200).json(r))
        .catch(e => {
            console.log('>>>>>>>> error', e)
            res.status(500).json(e)
        })
}

const create = (req, res, next) => {
    new Promise((resolve, reject) => camundaService.worker.subscribe('orderProcess:checkout', ['goods'], (context, callback) => {
        const {
            variables,
            extendLock
        } = context

        const goods = variables.goods

        if (!goods || goods.length === 0) {
            const err = new Error('no goods in basket')
            reject(err)
            callback(err)
        }

        const order = {
            orderId: uuid.v4(),
            goods
        }

        logger.info(`created order[orderId=${order.orderId}] with goods[length=${order.goods.length}]`)

        if (Math.random() > 0.6) {
            logger.warn(`delayed order=[orderId=${order.orderId}]`)
            extendLock(5000).then(r => delay(Math.random() * 3))
        }

        const vars = {
            variables: {
                order: order
            }
        }

        callback(null, vars)
        resolve(vars)
    }))
        .then(r => res.status(200).json(r))
        .catch(e => {
            console.log('>>>>>>>> error', e)
            res.status(500).json(e)
        })
}

const ship = (req, res, next) => {
    new Promise((resolve, reject) => camundaService.worker.subscribe('orderProcess:shipment', ['order'], (context, callback) => {
        const { variables } = context

        const order = variables.order

        logger.info(`processing order[id=${order.orderId}]`)

        delay(Math.random() *  1.5)
            .then(() => {
                if (Math.random() > 0.8) {
                    const e = new Error('failed to process shipment: RANDOM STUFF')
                    callback(e)
                    reject(e)
                }

                order.shipmentId = uuid.v4()
                order.shipped = true

                logger.info(`shipping order[id=${order.orderId}] with shipment[id=${order.shipmentId}]`)

                const vars = {
                    variables: {
                        order: order
                    }
                }
                callback(null, vars)
                resolve(vars)
            })
    }))
        .then(r => res.status(200).json(r))
        .catch(e => {
            console.log('>>>>>>>> error', e)
            res.status(500).json(e)
        })
}

const delay = seconds => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

class CamundaApi implements Api {
    routes() {
        return express.Router()
            .post('/order/deploy', deployOrderProcess)
            .post('/order/checkout', checkout)
            .post('/order/create', create)
            .post('/order/ship', ship)
    }
}

const api = new CamundaApi()

export default server => server.use(URI, api.routes())
