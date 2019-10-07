import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import { checkAuth } from './viewax/axfview'
import Row from 'react-bootstrap/Row'

class About extends Component {
  state = {
    redirectQuiz: false,
    redirectLogin: false
  }

  handleBack = e => {
    const { user, usersList } = this.props
    e.preventDefault()
    if (!checkAuth(user, usersList)) {
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
          <Row className="justify-content-md-center">
            <h5 className="display-6">Hello ! This app is written using <b>React-Redux, Koa, MongoDB</b>.</h5>
          </Row>
          <Row className="justify-content-md-center">
            <h5 className="display-6">Source code Front-End:</h5>
          </Row>
          <Row className="justify-content-md-center">
            <a href="https://github.com/Mirage74/capitals">Front-end on "Github"</a>
          </Row>
          <Row className="justify-content-md-center">
            <h5 className="display-6">Source code Back-End:</h5>
          </Row>
          <Row className="justify-content-md-center">
            <a href="https://github.com/Mirage74/capitals-server">Back-end on "Github"</a>
          </Row>
          <br /><br /><br />
          <Row className="justify-content-md-center">
            <h5 className="display-6">The United Nations member states are the 193 sovereign states,</h5>
          </Row>
          <Row className="justify-content-md-center">
            <h5 className="display-6">so 193 countries available in this quiz:</h5>
          </Row>          
          <Row className="justify-content-md-center">
            <a href="https://en.wikipedia.org/wiki/Member_states_of_the_United_Nations">UN members</a>
          </Row>
          <Row className="justify-content-md-center">
            <h5 className="display-6"> List of national capitals:</h5>
          </Row>
          <Row className="justify-content-md-center">
            <a href="https://en.wikipedia.org/wiki/List_of_national_capitals">national capitals</a>
          </Row>
          <br /><br /><br />
          <Row className="justify-content-md-center">
            <h5 className="display-5">By Alex Babrouski</h5>
          </Row>
          <Row className="justify-content-md-center">
            <h5 className="display-5">e-mail:
              <a href="mailto:balexvicx@gmail.com">balexvicx@gmail.com</a>
            </h5>
          </Row>
          <Row className="justify-content-md-center">
            <h5 className="display-5">phone: (+48)733-195-061</h5>
          </Row>
          <Row className="justify-content-md-center">
            <Button onClick={this.handleBack}>Back</Button>
          </Row>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.auth.currUser,
  usersList: state.listCapitals.currUserList
})

export default connect(mapStateToProps)(About)