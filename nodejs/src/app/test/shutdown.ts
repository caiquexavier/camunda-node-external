
import { DEFAULT_PORT, DEFAULT_ENV } from '../server'

export default app => {
    app.instance.close()
    process.env.PORT = DEFAULT_PORT
    process.env.NODE_ENV = DEFAULT_ENV
}
