import React, { Component } from 'react';
import axios from 'axios'
import pathServer from "./backendpath"


class Register extends Component {
  state = {
    displayName: '',
    email: '',
    password: ''
  };

  //  componentWillMount() {
  //    const { allowRegistration } = this.props.settings;

  //    if (!allowRegistration) {
  //      this.props.history.push('/');
  //    }
  //  }

  onSubmit = e => {
    e.preventDefault();
    const { displayName, email, password } = this.state;
    axios.post(pathServer + 'user', {
      "displayName": displayName,
      "email": email,
      "password": password
    })
      .then(res => {
        let strExist = "" + res.data
        if (strExist.substring(0, 24) === `User with "Display name"`) {
          document.getElementById("idDisplayName").innerHTML = `User "${displayName}" already exist, please enter another "Display name"`
        }
        if (strExist.substring(0, 17) === `User with "email"`) {
        }

      })
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
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
                <div className="form-group">
                  <label id="idEmail" htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
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

