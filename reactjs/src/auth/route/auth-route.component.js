
import React from 'react'
import { Route }from 'react-router-dom'

import AuthRedirect from '../redirect/auth-redirect.component'
import { authenticated } from '../'

const AuthRoute = ({ component: Component, ...rest }) => {
    return <Route
        {...rest}
        render=
        { props =>
            authenticated()
            ? ( <Component {...props} />)
            : (<AuthRedirect />)
        }
    />
}

export default AuthRoute
