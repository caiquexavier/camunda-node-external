import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Material-UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { indigo, blue, red } from '@material-ui/core/colors/';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// Icons
import ExitToApp from '@material-ui/icons/ExitToApp';

import Signin from './auth/signin/signin.component'
import AuthRoute from './auth/route/auth-route.component'
import AuthRedirect from './auth/redirect/auth-redirect.component';

import Home from './home/home.component'

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div>
      <AppBar color="inherit" position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
      <Typography variant="title" color="inherit">
      Camunda
      </Typography>
        <Grid container justify={'flex-end'} >
          <Grid item>
            <IconButton color="inherit" mini variant="fab" aria-label="logout" id="logout" href="/signout"><ExitToApp /></IconButton>
          </Grid>
        </Grid>
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
       </MuiThemeProvider>
    );
  }
}

export default App;
