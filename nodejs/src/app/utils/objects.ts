
import logger from '../log'
import option from '../utils/option'

import * as util from 'util'
import * as moment from 'moment'

const _logtag = tag => option(tag).orElse(moment().toISOString())

const log = (obj: any, tag: string = null) => {
    logger.debug(`OBJECT LOG ${_logtag(tag)}: ${inspect(obj)}`)
    return obj
}

const merge = (obj, toMerge) => Object.assign(obj, toMerge)

const json = obj => JSON.stringify(obj)

const inspect = obj => util.inspect(obj, false, null)

export { merge, json, inspect, log }
