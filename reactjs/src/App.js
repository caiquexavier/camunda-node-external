import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Signin from './auth/signin/signin.component'
import AuthRoute from './auth/route/auth-route.component'
import AuthRedirect from './auth/redirect/auth-redirect.component';

import Home from './home/home.component'

class App extends Component {
  render() {
    return (
      <Router>
        <content>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signout" component={AuthRedirect} />
          <AuthRoute path="/home" component={Home} />
        </content>
      </Router>
    );
  }
}

export default App;
