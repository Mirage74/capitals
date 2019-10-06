import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Quiz from './components/quiz'
import StartQuiz from './components/layout/startQuiz'
import ViewScore from './components/layout/viewScore'
import LastQuiz from './components/layout/lastquiz'
import About from './components/layout/about'
import ViewCapitals from './components/layout/viewcapitals'
import './App.css';

class App extends Component {

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
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
                exact path="/Register"
                component={Register}
              />
              <Route
                exact path="/About"
                render={(props) => <About {...props} />}
              />
              <Route
                exact path="/Quiz"
                render={(props) => <Quiz {...props} />}
              />
              <Route
                exact path="/StartQuiz"
                render={(props) => <StartQuiz {...props} />}
              />
              <Route
                exact path="/ViewScore"
                render={(props) => <ViewScore {...props} />}
              />
              <Route
                exact path="/LastQuiz"
                render={(props) => <LastQuiz {...props} />}
              />              
              <Route
                exact path="/ViewCapitals"
                render={(props) => <ViewCapitals {...props} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}


export default App
