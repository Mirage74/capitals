import "bootstrap/dist/css/bootstrap.min.css"
import Media from "react-media"
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';
import * as countries from '../const/const_caps';
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

    //localStorage.setItem("jwt", "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMDVlZTgxYTVjYjc1MDAxNjVlMTAyNiIsImRpc3BsYXlOYW1lIjoiU2xhdmEiLCJlbWFpbCI6InNsYXZhQG1haWwucnUiLCJpYXQiOjE1NDM4OTI2ODJ9.01MFk5EF6CWksLI0wCIMXkWzv2AJpalvb1wQadM2dzQ")
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
        'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMDZmMDIzMTlmZTZjMDAxNmVkODQ4OCIsImRpc3BsYXlOYW1lIjoiSm9obiIsImVtYWlsIjoiRG9lQGdtYWlsLmNvbSIsImlhdCI6MTU0Mzk1ODU4OH0.paGA3aV_FY20hg3kYP-f1a6QsWpwdYrmqpXewrsG_Yw'
      }
    })
      .then(res => {
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
    const height = window.innerHeight
    console.log(height)


    function getOneCard(countryName, capitalName) {
      return (
        <div>
          <div className="card">
            <img src={countryName} alt={countryName} className="card-img-top " />
            <div className="card-body">
              <h3 className="card-title  text-center">{capitalName}</h3>
            </div>
          </div>
        </div>
      )
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    console.log(getRandomInt(197));
    // expected output: 0, 1 or 2

    const albaniaCard = getOneCard(countries.ALB, "Tirana")
    const algeriaCard = getOneCard(countries.DZA, "Algeria")
    const andorraCard = getOneCard(countries.AND, "Andorra")

    console.log(countries)
    const TopRaw = (
      <div className="column align-items-start card hw-auto">
        {albaniaCard}
        {algeriaCard}
        {andorraCard}
      </div>
    )
    const BottomRaw = (
      <div className="row align-items-end card-deck w-auto">
        {andorraCard}
        {algeriaCard}
        {albaniaCard}
      </div>
    )



    const logForm = (
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
    )

    const logForm750 = (
      <div className="card">
        <div className="card-body">
          {message ? (
            <Alert message={message} messageType={messageType} />
          ) : null}
          <h5 className="text-center pb-0 pt-0">
            <span className="text-primary">
              <i className="fas fa-lock" /> Login
                </span>
          </h5>
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
    )

    const resolutionBig = (
      <div className="gridmenu">
        <div className="Top1  justify-content-center align-self-center">{albaniaCard}</div>
        <div className="Top2">Top2</div>
        <div className="Top3">Top3</div>
        <div className="Top4">Top4</div>
        <div className="Top5">Top5</div>
        <div className="Top6">Top6</div>
        <div className="Top7">Top7</div>
        <div className="Left  justify-content-center align-self-center">{andorraCard}</div>
        <div className="Empty">Empty</div>
        <div className="Right">right</div>
        <div className="Bot1">Bot1</div>
        <div className="Bot2">Bot2</div>
        <div className="Bot3">Bot3</div>
        <div className="Bot4  justify-content-center align-self-center">{albaniaCard}</div>
        <div className="Bot5">Bot5</div>
        <div className="Bot6">Bot6</div>
        <div className="Bot7">Bot7</div>
      </div>
    )

    const resolution1200MAX = (
      <div className="gridmenu">
        <div className="Top1  justify-content-center align-self-center">{albaniaCard}</div>
        <div className="Top2">Top2</div>
        <div className="Top3">Top3</div>
        <div className="Top4">Top4</div>
        <div className="Top5">Top5</div>
        <div className="Left  justify-content-center align-self-center">{andorraCard}</div>
        <div className="Empty">Empty</div>
        <div className="Right">right</div>
        <div className="Bot1">Bot1</div>
        <div className="Bot2">Bot2</div>
        <div className="Bot3">Bot3</div>
        <div className="Bot4  justify-content-center align-self-center">{albaniaCard}</div>
        <div className="Bot5">Bot5</div>
      </div>
    )

    return (
      <div>
        <Media query="(max-height: 750px)">
          {matches =>
            matches ? (
              <div className="divInCenter">{logForm750}</div>
            ) : (
              <div className="divInCenter">{logForm}</div>
              )
          }
        </Media>

        <Media query="(max-width: 1200px)">
          {matches =>
            matches ? (
              <div>
                {resolution1200MAX}
              </div>
            ) : (
                <div>
                  {resolutionBig}
                </div>

              )
          }
        </Media>
      </div>

    )
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
