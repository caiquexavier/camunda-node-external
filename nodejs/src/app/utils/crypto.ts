
import * as bcrypt from 'bcrypt'

import option from '../utils/option'

const encode = term => option(term)
    .map(t => bcrypt.hashSync(t, 10))
    .orElse('')

const compare = (term, hash) => bcrypt.compareSync(term, hash)

export { encode, compare }
