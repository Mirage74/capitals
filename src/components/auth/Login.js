import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';
import * as countries from '../const/const_caps';
import {picsHeight} from '../../config';
import "./login.css"
import pathServer from "./backendpath"
import axios from 'axios'
//import localStorage from 'localforage'

class Login extends Component {
  state = {
    email: '',
    password: ''
  };


  onSubmit = e => {
    e.preventDefault();


    console.log(localStorage.getItem('jwt'))

    // let store = localStorage.createInstance()
    //
    //
    //
    // store.setItem("jwt", "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMDVlZTgxYTVjYjc1MDAxNjVlMTAyNiIsImRpc3BsYXlOYW1lIjoiU2xhdmEiLCJlbWFpbCI6InNsYXZhQG1haWwucnUiLCJpYXQiOjE1NDM4OTI2ODJ9.01MFk5EF6CWksLI0wCIMXkWzv2AJpalvb1wQadM2dzQ")
    // store.getItem("jwt")
    //   .then(res => {
    //     console.log(res)
    //    })




    axios.get(pathServer + 'custom', {
      headers: {
        'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMDVlZTgxYTVjYjc1MDAxNjVlMTAyNiIsImRpc3BsYXlOYW1lIjoiU2xhdmEiLCJlbWFpbCI6InNsYXZhQG1haWwucnUiLCJpYXQiOjE1NDM4OTI2ODJ9.01MFk5EF6CWksLI0wCIMXkWzv2AJpalvb1wQadM2dzQ'
      }
    })
      .then (res => {
        console.log(res.data)
      })
    }


    // const { firebase, notifyUser } = this.props;
    // const { email, password } = this.state;
    //
    // firebase
    //   .login({
    //     email,
    //     password
    //   })
    //   .catch(err => notifyUser('Invalid Login Credentials', 'error'));
  //};

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="container-fluid ">


        <div className="card-deck w-100 " >

          <div className="card px-1">
            <img width={picsHeight}  src={countries.Albania}  alt = {countries.Albania} className="card-img-top " />
              <div className="card-body">
                <h5 className="card-title  text-center">Tirana</h5>
              </div>
          </div>

          <div className="card">

          </div>

          <div className="card">
            <img src={countries.Algeria}  alt = {countries.Algeria} className="card-img-top " />
            <div className="card-body">
              <h5 className="card-title text-center">Algeria</h5>
            </div>
          </div>

          <div className="card">

          </div>

          <div className="card">
            <img src={countries.Salisbury}  alt = {countries.Salisbury} className="card-img-top " />
            <div className="card-body">
              <h5 className="card-title  text-center">Salisbury</h5>
            </div>
          </div>

          <div className="card">

          </div>

          <div className="card">
            <img src={countries.Andorra}  alt = {countries.Andorra} className="card-img-top " />
            <div className="card-body">
              <h5 className="card-title  text-center">Andorra</h5>
            </div>
          </div>

        </div>
        <br />


        <div className="row">
          <div className="col-md-offset-4 mx-md-auto">
            <div className="card">
              <div className="card-body">
                {message ? (
                  <Alert message={message} messageType={messageType} />
                ) : null}
                <h1 className="text-center pb-4 pt-3">
                        <span className="text-primary">
                      <i className="fas fa-lock" /> Login
                    </span>
                </h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
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
                    value="Login"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Login);
