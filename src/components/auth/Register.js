import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from "react-router-dom"
//import Login from './Login'
import { backendPath, MIN_USER_displayName_LENGTH, MIN_USER_PASSWORD_LENGTH } from '../../config'

class Register extends Component {
  state = {
    displayName: '',
    password: '',
    redirectLogin: false,
    errors: {}
  }

  //  componentWillMount() {
  //    const { allowRegistration } = this.props.settings;

  //    if (!allowRegistration) {
  //      this.props.history.push('/');
  //    }
  //  }

  onSubmit = e => {
    e.preventDefault()
    const { displayName, password } = this.state
    //console.log("errors : ", errors)

    if (displayName.length < MIN_USER_displayName_LENGTH) {
      this.setState({ errors: { displayName: `"Display name" length must be at least ${MIN_USER_displayName_LENGTH}` } })
      return
    }

    if (password.length < MIN_USER_PASSWORD_LENGTH) {
      this.setState({ errors: { password: `password length must be at least ${MIN_USER_PASSWORD_LENGTH}` } })
      return
    }

    
    axios.post(backendPath + 'user', {
      "displayName": displayName,
      "password": password,
      "bestScore": [0, 0, 0],
      "lastRes": [{}, {}, {}]
    })
      .then(res => {
        let strExist = "" + res.data
        //      console.log("res.data: ", res.data)
        if (strExist.substring(0, 23) === `User with "displayName"`) {
          this.setState({ errors: { displayName: `User "${displayName}" already exist, please enter another "Display name"` } })
        } else {
          if (res.data.displayName.length > 0) {
            // console.log(res.data.bestScore)
            // console.log(res.data.bestScore[2])
            this.setState({ redirectLogin: true })
          }
        }

      })
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { errors } = this.state
    //console.log("errors : ", errors)
    let buttonDisplayName, buttonPass
    if (!errors.displayName) {
      buttonDisplayName = (
        <div>
          <label id="idDisplayName" htmlFor="displayName">Display name</label>
          <input
            type="text"
            className="form-control"
            name="displayName"
            required
            value={this.state.displayName}
            onChange={this.onChange}
          />
        </div>
      )
    } else {
      buttonDisplayName = (
        <div className="form-group row">
          <label id="idDisplayName" htmlFor="displayName">Display name</label>
          <input
            type="text"
            className="form-control is-invalid"
            name="displayName"
            required
            value={this.state.displayName}
            onChange={this.onChange}
          />
          <div>
            <span className="help-block text-danger">{errors.displayName}</span>
          </div>
        </div >
      )
    }

    if (!errors.password) {
      buttonPass = (
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            required
            value={this.state.password}
            onChange={this.onChange}
          />
        </div>
      )
    } else {
      buttonPass = (
        <div className="form-group row">
          <label id="idDisplayName" htmlFor="displayName">Display name</label>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control is-invalid"
            name="password"
            required
            value={this.state.password}
            onChange={this.onChange}
          />
          <div>
            <span className="help-block text-danger">{errors.password}</span>
          </div>
        </div >
      )
    }

    if (this.state.redirectLogin) {
      return <Redirect to='/Login' />
    }


    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Register
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  {buttonDisplayName}
                </div>
                <div className="form-group">
                  {buttonPass}
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary btn-block"
                  onClick={this.handleRegClick}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {

};

export default Register

