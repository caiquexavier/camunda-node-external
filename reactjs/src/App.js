import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


import Signin from './auth/signin/signin.component'
import AuthRoute from './auth/route/auth-route.component'
import AuthRedirect from './auth/redirect/auth-redirect.component';

import Home from './home/home.component'

class App extends Component {
  render() {
    return (
      <div>

      <AppBar position="static">
      <Toolbar>
       <Typography variant="title" color="inherit">
         Camunda UI POC
       </Typography>
      </Toolbar>
      </AppBar>

        <Router>
          <content>
            <Route exact path="/" component={Signin} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={AuthRedirect} />
            <AuthRoute path="/home" component={Home} />
          </content>
        </Router>


      </div>
    );
  }
}

export default App;
