
import * as sjcl from 'sjcl'
import * as base64 from 'base-64'

const secret = base64.encode('camunda-node-external-system(primeNumber(115))')
const tokenKeyHashed = base64.encode(`${secret}-token`)

const encode = data => {
      if (data) {
            const encrypted = sjcl.encrypt(secret, data)
            const hashed = base64.encode(JSON.stringify(encrypted))
            return hashed
      }

      return ''
}

const decode = encrypted => {
      if (encrypted) {
            const unhashed = JSON.parse(base64.decode(encrypted))
            const decrypted = sjcl.decrypt(secret, unhashed)
            return decrypted
      }

      return ''
}

export { encode, decode, tokenKeyHashed }

