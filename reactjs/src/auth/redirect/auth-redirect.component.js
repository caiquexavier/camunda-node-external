
import React from 'react'
import { Redirect } from 'react-router-dom'

import { signout } from '../'

const AuthRedirect = props => {
    signout()
    return (
        <Redirect 
            to={{
                pathname: '/',
                state: { from: props.location }
            }}>
        </Redirect>
    )
}

export default AuthRedirect
