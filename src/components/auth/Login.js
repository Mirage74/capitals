import "bootstrap/dist/css/bootstrap.min.css"
import Media from "react-media"
import React, { Component } from 'react'
import * as data from '../const/const_caps';
import { getImageName } from "../../axfunc"
import "./login.css"
import { Redirect } from "react-router-dom"
import axios from 'axios'
import { connect } from 'react-redux'
import { getCapitals } from '../../actions/list-cpt/action'
import { setUser } from '../../actions/auth/action'
import { Log_Refresh_In_Seconds, backendPath } from '../../config'


class Login extends Component {
  _isMounted = false
  state = {
    displayName: '',
    password: '',
    redirectReg: false,
    redirectQuiz: false
  }




  handleRegClick = e => {
    if (this._isMounted) {
      this.setState({ redirectReg: true })
      //console.log("this.setState({ redirectReg: true })")
    }
  }


  componentDidMount() {
    this._isMounted = true    
    this.timerID = setInterval(this.props.getCapitals, 1000 * Log_Refresh_In_Seconds)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
    this._isMounted = false
  }



  onSubmit = e => {
    e.preventDefault()
    const { displayName, password } = this.state
    let dn = displayName.toLowerCase()
    axios.post(backendPath + 'login', {
      "login": dn,
      "password": password
    })
      .then(res => {
        console.log("res.data", res.data)
        if (res.data !== "Login failed") {
          this.setState({ displayName: res.data.displayName })
          if (this._isMounted) {
            this.props.setUser(res.data)
            //this.setState({ redirectQuiz: true })
          }
        }
      })
  }

  onChange = e => {
    if (this._isMounted) {
      //console.log("this.setState({ [e.target.name]: e.target.value })")
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  isEmptyObject = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key))
        return false
    }
    return true
  }

  render() {
    const { capitals, user } = this.props
    const { redirectReg, redirectQuiz } = this.state
    if (redirectReg) {
      return <Redirect to='/Register' />
    }

    //if (redirectQuiz || ( (user !== "Login failed") && (user !== ""))) {
    if (redirectQuiz || (typeof user === 'object' && user !== null && !this.isEmptyObject(user))) {
      console.log("login this.state.displayName ", this.state.displayName)
      return <Redirect to={{
        pathname: 'Quiz',
        state: {
          displayName: this.state.displayName
        }
      }}
      />
    }


    function getOneCard(countryName, capitalName) {
      return (
        <div>
          <div className="card card-my">
            <img src={countryName} alt={countryName} className="card-img-top " />
            <div className="card-body">
              <h3 className="card-title wrap text-center">{capitalName}</h3>
            </div>
          </div>
        </div>
      )
    }



    let Card_0, Card_1, Card_2, Card_3, Card_4, Card_5, Card_6, Card_7, Card_8, Card_9, Card_10, Card_11, Card_12, Card_13, Card_14, Card_15

    function createCards() {
      Card_0 = getOneCard(data[getImageName(capitals[0])], data.capitalsNamesShort[(capitals[0])])
      Card_1 = getOneCard(data[getImageName(capitals[1])], data.capitalsNamesShort[(capitals[1])])
      Card_2 = getOneCard(data[getImageName(capitals[2])], data.capitalsNamesShort[(capitals[2])])
      Card_3 = getOneCard(data[getImageName(capitals[3])], data.capitalsNamesShort[(capitals[3])])
      Card_4 = getOneCard(data[getImageName(capitals[4])], data.capitalsNamesShort[(capitals[4])])
      Card_5 = getOneCard(data[getImageName(capitals[5])], data.capitalsNamesShort[(capitals[5])])
      Card_6 = getOneCard(data[getImageName(capitals[6])], data.capitalsNamesShort[(capitals[6])])
      Card_7 = getOneCard(data[getImageName(capitals[7])], data.capitalsNamesShort[(capitals[7])])
      Card_8 = getOneCard(data[getImageName(capitals[8])], data.capitalsNamesShort[(capitals[8])])
      Card_9 = getOneCard(data[getImageName(capitals[9])], data.capitalsNamesShort[(capitals[9])])
      Card_10 = getOneCard(data[getImageName(capitals[10])], data.capitalsNamesShort[(capitals[10])])
      Card_11 = getOneCard(data[getImageName(capitals[11])], data.capitalsNamesShort[(capitals[11])])
      Card_12 = getOneCard(data[getImageName(capitals[12])], data.capitalsNamesShort[(capitals[12])])
      Card_13 = getOneCard(data[getImageName(capitals[13])], data.capitalsNamesShort[(capitals[13])])
      Card_14 = getOneCard(data[getImageName(capitals[14])], data.capitalsNamesShort[(capitals[14])])
      Card_15 = getOneCard(data[getImageName(capitals[15])], data.capitalsNamesShort[(capitals[15])])
      //console.log("Card_0", Card_0)
    }

    createCards()




    const logForm = (
      <div className="card">
        <h4 className="text-center" >Do you know the capitals ?</h4>
        <div className="card-body">
          <h1 className="text-center pb-4 pt-3">
            <button type="submit" className="btn btn-primary" onClick={this.handleRegClick}>Register</button>
            <span className="text-primary">
              <i className="fas fa-lock" /> <i><font size="5"> or</font></i> Login
                </span>
          </h1>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="displayName">displayName</label>
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
        <div className="Top1 justify-content-center align-self-center">{Card_0}</div>
        <div className="Top2 justify-content-center align-self-center">{Card_1}</div>
        <div className="Top3 justify-content-center align-self-center">{Card_2}</div>
        <div className="Top4 justify-content-center align-self-center">{Card_3}</div>
        <div className="Top5 justify-content-center align-self-center">{Card_4}</div>
        <div className="Top6 justify-content-center align-self-center">{Card_5}</div>
        <div className="Top7 justify-content-center align-self-center">{Card_6}</div>
        <div className="Left  justify-content-center align-self-center">{Card_7}</div>
        <div className="Empty"></div>
        <div className="Right  justify-content-center align-self-center">{Card_8}</div>
        <div className="Bot1  justify-content-center align-self-center">{Card_9}</div>
        <div className="Bot2  justify-content-center align-self-center">{Card_10}</div>
        <div className="Bot3  justify-content-center align-self-center">{Card_11}</div>
        <div className="Bot4  justify-content-center align-self-center">{Card_12}</div>
        <div className="Bot5  justify-content-center align-self-center">{Card_13}</div>
        <div className="Bot6  justify-content-center align-self-center">{Card_14}</div>
        <div className="Bot7  justify-content-center align-self-center">{Card_15}</div>
      </div>
    )

    const resolution1200MAX = (
      <div className="gridmenu">
        <div className="Top1 justify-content-center align-self-center">{Card_0}</div>
        <div className="Top2 justify-content-center align-self-center">{Card_1}</div>
        <div className="Top3 justify-content-center align-self-center">{Card_2}</div>
        <div className="Top4 justify-content-center align-self-center">{Card_3}</div>
        <div className="Top5 justify-content-center align-self-center">{Card_4}</div>
        <div className="Left  justify-content-center align-self-center">{Card_7}</div>
        <div className="Empty"></div>
        <div className="Right  justify-content-center align-self-center">{Card_8}</div>
        <div className="Bot1  justify-content-center align-self-center">{Card_9}</div>
        <div className="Bot2  justify-content-center align-self-center">{Card_10}</div>
        <div className="Bot3  justify-content-center align-self-center">{Card_11}</div>
        <div className="Bot4  justify-content-center align-self-center">{Card_12}</div>
        <div className="Bot5  justify-content-center align-self-center">{Card_13}</div>
      </div>
    )

    const resolution800MAX = (
      <div className="gridmenu">
        <div className="Empty"></div>
      </div>
    )

    const itemWidthMax800 = (
      <div>
        <div>{resolution800MAX}</div>
        <div className="divInCenter">{logForm}</div>
      </div>
    )

    const itemWidthMax1200 = (
      <div>
        <div>{resolution1200MAX}</div>
        <div className="divInCenter">{logForm}</div>
      </div>
    )


    const itemWidthAbove1200 = (
      <div>
        <div>{resolutionBig}</div>
        <div className="divInCenter">{logForm}</div>
      </div>
    )




    return (
      <div>

        <Media query="(max-height: 700px)">
          {
            matches => matches ? (
              <div className="divInCenter"> {logForm} </div>
            ) : (
                <Media query="(max-width: 1200px)">
                  {
                    matches => matches ? (
                      <Media query="(max-width: 800px)">
                        {
                          matches => matches ? (
                            <div>
                              {itemWidthMax800}
                            </div>
                          ) : (
                              <div>
                                {itemWidthMax1200}
                              </div>
                            )
                        }
                      </Media>
                    ) : (
                        <div>
                          {itemWidthAbove1200}
                        </div>
                      )}
                </Media>
              )}
        </Media>


      </div>

    )
  }
}


const mapStateToProps = (state) => ({

  capitals: state.listCapitals.currCapitals,
  user: state.auth.currUser

})

export default connect(mapStateToProps, { getCapitals, setUser })(Login)
