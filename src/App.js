import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { Provider } from 'react-redux';
//import store from './store';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Quiz from './components/quiz'
import StartQuiz from './components/layout/startQuiz'
import ViewScore from './components/layout/viewScore'
import './App.css';

class App extends Component {



// getDisplayNameCallback = (dataFromChild) => {
//   this.setState({ displayName: dataFromChild })
//   localStorage.setItem("displayName", dataFromChild)
//   console.log(localStorage)
// }


  render() {
    return (
        <Router basename = {process.env.PUBLIC_URL}>
          <div>
            <div id="root">
              <Switch>
              <Route
                  exact path="/"
                  render={(props) => <Login {...props} />}
                />
                <Route
                  exact path="/login"
                  render={(props) => <Login {...props} />}
                />                                
                <Route
                  exact
                  path="/Register"
                  component={Register}
                />
                <Route
                  exact path="/Quiz"
                  render={(props) => <Quiz {...props} />}
                />
                <Route
                  exact path="/StartQuiz"
                  render={(props) => <StartQuiz {...props}/>}
                />
                <Route
                  exact path="/ViewScore"
                  render={(props) => <ViewScore {...props}/>}
                />                
              </Switch>
            </div>
          </div>
        </Router>
    )
  }
}

export default App;
