import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

import { Provider } from 'react-redux';
import store from './store';

//import AppNavbar from './components/layout/AppNavbar';
//import Dashboard from './components/layout/Dashboard';
//import AddClient from './components/clients/AddClient';
//import EditClient from './components/clients/EditClient';
//import ClientDetails from './components/clients/ClientDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
//import Settings from './components/settings/Settings';

import './App.css';


{/* <Switch>
<Route
  exact
  path="/"
  component={UserIsNotAuthenticated(Login)}
/>
<Route
  exact
  path="/login"
  component={UserIsNotAuthenticated(Login)}
/>
<Route
  exact
  path="/register"
  component={UserIsNotAuthenticated(Register)}
/>
</Switch> */}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename = {process.env.PUBLIC_URL}>
          <div>
            <div id="rot">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={Login}
                />
                <Route
                  exact
                  path="/login"
                  component={Login}
                />
                <Route
                  exact
                  path="/Register"
                  component={Register}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
