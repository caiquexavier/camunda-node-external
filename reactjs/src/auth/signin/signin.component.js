
import React from 'react'

import { Component } from 'react'
import { withRouter } from 'react-router-dom'
// Material-UI
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Button,
  TextField,
  FormControl
} from '@material-ui/core/';
// Icons
import LockIcon from '@material-ui/icons/Lock';
import SendIcon from '@material-ui/icons/Send';
// Transitions
import Grow from '@material-ui/core/Grow';

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

    <Grid container justify={'center'} >
      <Grid item xs={true} md={6} >
      <div style={{ padding: 10 }}>
        <form method="post" onSubmit={this.onSubimit}>
          <Grow in={true}>
          <Card>
          <CardHeader title="Login" avatar={<Avatar > <LockIcon /> </Avatar>}/>
            <CardContent>
               <FormControl fullWidth>
                  <TextField  id="username" label="Usuário"  value={this.state.username} onChange={this.changeUsername}  />
                  <TextField  id="username" label="Senha"  value={this.state.password} onChange={this.changePassword} />
                </FormControl>
            </CardContent>
            <CardActions>
              <Grid container justify={'flex-end'} >
                <Grid item>
                <Button type="submit" variant="fab" color="secondary" aria-label="login"><SendIcon /></Button>
                </Grid>
              </Grid>
            </CardActions>
            <Errors errors={this.state.errors} onDelete={this.clearErrors} />
          </Card>
          </Grow>
        </form>
      </div>
      </Grid>
    </Grid>

    )
  }
}

export default withRouter(Signin)
