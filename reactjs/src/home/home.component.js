
import React from 'react'
import { Component } from 'react'

import Errors from '../error/errors.component'
import { me } from '../auth'

import './home.component.css'

import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarBurger,
    NavbarStart,
    NavbarMenu,
    NavbarLink,
    NavbarDropdown,
    NavbarDivider,
    NavbarEnd,
    Icon,
    Field,
    Control,
    Button
} from 'bloomer'

const data = {
    email: 'desconhecido',
    isActive: false,
    errors: []
}

class Home extends Component {

    constructor(props) {
        super()
        this.state = data
        this.onClickNav = this.onClickNav.bind(this)
        this.onClickTestProtected = this.onClickTestProtected.bind(this)

        this.clearErrors = this.clearErrors.bind(this)
    }

    componentDidMount() {
        me()
            .then(res => this.setState({email: res.data.user}))
            .catch(err => this.addError(err))
    }

    onClickNav = e => console.log('onClickNav')

    onClickTestProtected = e => 
        me()
            .then(res => this.setState({ email: res.data.user}))
            .catch(err => this.addError(err))
   

    clearErrors(e) {
        this.setState({ errors: [] })
    }

    addError(error) {
        const errors = [error].concat(this.state.errors)
        this.setState({ errors: errors })
    }

    render() {
        return (
            <Navbar style={{ borderBottom: 'solid 1px #0F000F', margin: '0' }}>
                <NavbarBrand>
                    <NavbarItem target="_blank" href="#">
                        <h1>camunda-node-external</h1>
                    </NavbarItem>
                    <NavbarItem isHidden='desktop'>
                        <Icon className='fab fa-github' />
                    </NavbarItem>
                    <NavbarItem isHidden='desktop'>
                        <Icon className='fab fa-twitter' style={{ color: '#55acee' }} />
                    </NavbarItem>
                    <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                </NavbarBrand>
                <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
                    <NavbarStart>
                        <NavbarItem href='/home'>Home</NavbarItem>
                        <NavbarItem hasDropdown isHoverable>
                            <NavbarLink href='#/'>Documentation</NavbarLink>
                            <NavbarDropdown>
                                <NavbarItem href='#/' onClick={this.onClickTestProtected}>One A</NavbarItem>
                                <NavbarItem href='#/'>Two B</NavbarItem>
                                <NavbarDivider />
                                <NavbarItem href='#/'>Two A</NavbarItem>
                            </NavbarDropdown>
                        </NavbarItem>
                    </NavbarStart>
                    <NavbarEnd>
                        <NavbarItem href="https://github.com/" isHidden='touch'>
                            <Icon className='fab fa-github' />
                        </NavbarItem>
                        <NavbarItem href="https://twitter.com/" isHidden='touch'>
                            <Icon className='fab fa-twitter' style={{ color: '#55acee' }} />
                        </NavbarItem>
                        <NavbarItem>
                            <Field isGrouped>
                                <Control>
                                    { this.state.email }
                                    <Button id="logout" href="/signout">
                                        <Icon className="fas fa-sign-out-alt" />
                                        <span>Sair</span>
                                    </Button>
                                </Control>
                            </Field>
                        </NavbarItem>
                    </NavbarEnd>
                </NavbarMenu>
                <Errors errors={this.state.errors} onDelete={this.clearErrors}/>
            </Navbar>
        )
    }
}

export default Home
