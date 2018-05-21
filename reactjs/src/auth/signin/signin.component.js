
import React from 'react'

import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Errors from '../../error/errors.component'
import { signin } from '../'

import './signin.component.css'

const data = {
    username: '',
    password: '',
    remember: false,
    errors: []
}

class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = data
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeRemember = this.changeRemember.bind(this)
        this.addError = this.addError.bind(this)
        this.clearErrors = this.clearErrors.bind(this)
        this.onSubimit = this.onSubimit.bind(this)
    }

    changeUsername (e) {
        this.setState({ username: e.target.value })
    }

    changePassword (e) {
        this.setState({ password: e.target.value })
    }

    changeRemember(e) {
        this.setState({ remember: e.target.checked })
    }

    clearErrors(e) {
        this.setState({ errors: [] })
    }

    addError(error) {
        const errors = [error].concat(this.state.errors)
        this.setState({ errors: errors })
    }

    onSubimit (e) {
        e.preventDefault()
        this.clearErrors()
        signin(this.state)
            .then(user => this.props.history.push('/home'))
            .catch(err => this.addError(err))
    }

    render() {
        return (
            <div className="columns" id="login">
                <div className="column is-7 left">
                    <h1>
                        camunda-node-external
                    </h1>
                    <h2>
                        Sua melhor<br />experiência<br />em <strong> Gestão de<br />
                        Sistemas
                    </strong>
                    </h2>
                </div>
                <div className="column is-5 right">
                    <div className="caixaLogin">

                        <Errors errors={this.state.errors} onDelete={this.clearErrors} />

                        <form method="post" onSubmit={this.onSubimit}>
                            <h1>Login</h1>
                            <input type="text" placeholder="Insira seu Usuário" name="user" value={this.state.username} onChange={this.changeUsername} />
                            <input type="password" placeholder="Insira sua Senha" name="passwd" value={this.state.password} onChange={this.changePassword} />
                            <input id="lembrar" type="checkbox" onChange={this.changeRemember} /> Lembrar-me
                            <button type="submit" className="button">ENTRAR</button>
                        </form>
                        <a href="/forgot" className="forget">Esqueceu a senha?</a>
                        <h2>Não tem uma conta?</h2>
                        <a href="/signup"> Criar conta </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signin)
