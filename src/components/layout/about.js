import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { Redirect } from "react-router-dom"

class About extends Component {
  state = {
    redirectQuiz: false,
    redirectLogin: false
  }

  handleBack = e => {
    e.preventDefault()
    if (this.props.location.state.isAuth) {
      this.setState({ redirectQuiz: true })
    } else {
      this.setState({ redirectLogin: true })
    }
  }

  render() {
    if (this.state.redirectLogin) {
      return <Redirect to='/Login' />
    }
    if (this.state.redirectQuiz) {
      return <Redirect to='/Quiz' />
    }


    return (
      <div>
        <br /><br /><br />
        <h5 className="display-6">Hello ! This app is written using React-Redux, Koa, MongoDB.</h5>
        <h5 className="display-6">Source code:</h5>
        <a href="https://github.com/Mirage74/capitals">code on "Github"</a>
        <br /><br /><br />
        <h5 className="display-6">The United Nations member states are the 193 sovereign states, so 193 countries available in this quiz:</h5>
        <a href="https://en.wikipedia.org/wiki/Member_states_of_the_United_Nations">UN members</a>
        <h5 className="display-6"> List of national capitals:</h5>
        <a href="https://en.wikipedia.org/wiki/List_of_national_capitals">national capitals</a>        
        <br /><br /><br />        
        <h5 className="display-5">By Alex Babrouski</h5>
        <h5 className="display-5">e-mail:
        <a href="mailto:balexvicx@gmail.com">balexvicx@gmail.com</a>
        </h5>
        <h5 className="display-5">phone: (+48)733-195-061</h5>
        <Button onClick={this.handleBack}>Back</Button>
      </div>
    )
  }
}


export default About