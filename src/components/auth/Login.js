import "bootstrap/dist/css/bootstrap.min.css"
import Media from "react-media"
import React, { Component } from 'react'
import * as data from '../const/const_caps';
import "./login.css"
import { Redirect } from "react-router-dom"
import axios from 'axios'
import { connect } from 'react-redux'
import { getCapitals } from '../../actions/list-cpt/action'
import { setDisplayName } from '../../actions/auth/action'
import { Log_Refresh_In_Seconds, backendPath } from '../../config'


class Login extends Component {
  state = {
    displayName: '',
    password: '',
    redirectReg: false,
    redirectQuiz: false
  }




  handleRegClick = e => {
    this.setState({ redirectReg: true })
  }


  componentDidMount() {
    this.timerID = setInterval(this.props.getCapitals, 1000 * Log_Refresh_In_Seconds)
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }



  onSubmit = e => {
    e.preventDefault()
    const { displayName, password } = this.state;

    axios.post(backendPath + 'login', {
      "login": displayName,
      "password": password
    })
      .then(res => {
        this.setState({ displayName: res.data.user })
        //this.props.displayName("" + res.data.user)
        this.setState({ redirectQuiz: true })
        this.props.setDisplayName("" + res.data.user)
      })


  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });


  render() {
    const { capitals } = this.props
    const { redirectReg, redirectQuiz } = this.state



    if (redirectReg) {
      return <Redirect to='/Register' />
    }

    if (redirectQuiz || (this.props.user.length > 0)) {
      console.log("this.props.user : ", this.props.user)
      return <Redirect to={{
        pathname: 'Quiz',
        state: {
          //displayName: this.props.user
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



    function getImageName(num) {
      let iso
      switch (num) {
        case 0: iso = "AFG"; break
        case 1: iso = "ALB"; break
        case 2: iso = "DZA"; break
        case 3: iso = "AND"; break
        case 4: iso = "AGO"; break
        case 5: iso = "ATG"; break
        case 6: iso = "ARG"; break
        case 7: iso = "ARM"; break
        case 8: iso = "AUS"; break
        case 9: iso = "AUT"; break
        case 10: iso = "AZE"; break
        case 11: iso = "BHS"; break
        case 12: iso = "BHR"; break
        case 13: iso = "BGD"; break
        case 14: iso = "BRB"; break
        case 15: iso = "BLR"; break
        case 16: iso = "BEL"; break
        case 17: iso = "BLZ"; break
        case 18: iso = "BEN"; break
        case 19: iso = "BTN"; break
        case 20: iso = "BOL"; break
        case 21: iso = "BIH"; break
        case 22: iso = "BWA"; break
        case 23: iso = "BRA"; break
        case 24: iso = "BRN"; break
        case 25: iso = "BGR"; break
        case 26: iso = "BFA"; break
        case 27: iso = "BDI"; break
        case 28: iso = "KHM"; break
        case 29: iso = "CMR"; break
        case 30: iso = "CAN"; break
        case 31: iso = "CPV"; break
        case 32: iso = "CAF"; break
        case 33: iso = "TCD"; break
        case 34: iso = "CHL"; break
        case 35: iso = "CHN"; break
        case 36: iso = "COL"; break
        case 37: iso = "COM"; break
        case 38: iso = "COG"; break
        case 39: iso = "CRI"; break
        case 40: iso = "CIV"; break
        case 41: iso = "HRV"; break
        case 42: iso = "CUB"; break
        case 43: iso = "CYP"; break
        case 44: iso = "CZE"; break
        case 45: iso = "COD"; break
        case 46: iso = "DNK"; break
        case 47: iso = "DJI"; break
        case 48: iso = "DMA"; break
        case 49: iso = "DOM"; break
        case 50: iso = "TLS"; break
        case 51: iso = "ECU"; break
        case 52: iso = "EGY"; break
        case 53: iso = "SLV"; break
        case 54: iso = "GNQ"; break
        case 55: iso = "ERI"; break
        case 56: iso = "EST"; break
        case 57: iso = "SWZ"; break
        case 58: iso = "ETH"; break
        case 59: iso = "FJI"; break
        case 60: iso = "FIN"; break
        case 61: iso = "FRA"; break
        case 62: iso = "GAB"; break
        case 63: iso = "GMB"; break
        case 64: iso = "GEO"; break
        case 65: iso = "DEU"; break
        case 66: iso = "GHA"; break
        case 67: iso = "GRC"; break
        case 68: iso = "GRD"; break
        case 69: iso = "GTM"; break
        case 70: iso = "GIN"; break
        case 71: iso = "GNB"; break
        case 72: iso = "GUY"; break
        case 73: iso = "HTI"; break
        case 74: iso = "HND"; break
        case 75: iso = "HUN"; break
        case 76: iso = "ISL"; break
        case 77: iso = "IND"; break
        case 78: iso = "IDN"; break
        case 79: iso = "IRN"; break
        case 80: iso = "IRQ"; break
        case 81: iso = "IRL"; break
        case 82: iso = "ISR"; break
        case 83: iso = "ITA"; break
        case 84: iso = "JAM"; break
        case 85: iso = "JPN"; break
        case 86: iso = "JOR"; break
        case 87: iso = "KAZ"; break
        case 88: iso = "KEN"; break
        case 89: iso = "KIR"; break
        case 90: iso = "KWT"; break
        case 91: iso = "KGZ"; break
        case 92: iso = "LAO"; break
        case 93: iso = "LVA"; break
        case 94: iso = "LBN"; break
        case 95: iso = "LSO"; break
        case 96: iso = "LBR"; break
        case 97: iso = "LBY"; break
        case 98: iso = "LIE"; break
        case 99: iso = "LTU"; break
        case 100: iso = "LUX"; break
        case 101: iso = "MDG"; break
        case 102: iso = "MWI"; break
        case 103: iso = "MYS"; break
        case 104: iso = "MDV"; break
        case 105: iso = "MLI"; break
        case 106: iso = "MLT"; break
        case 107: iso = "MHL"; break
        case 108: iso = "MRT"; break
        case 109: iso = "MUS"; break
        case 110: iso = "MEX"; break
        case 111: iso = "FSM"; break
        case 112: iso = "MDA"; break
        case 113: iso = "MCO"; break
        case 114: iso = "MNG"; break
        case 115: iso = "MNE"; break
        case 116: iso = "MAR"; break
        case 117: iso = "MOZ"; break
        case 118: iso = "MMR"; break
        case 119: iso = "NAM"; break
        case 120: iso = "NRU"; break
        case 121: iso = "NPL"; break
        case 122: iso = "NLD"; break
        case 123: iso = "NZL"; break
        case 124: iso = "NIC"; break
        case 125: iso = "NER"; break
        case 126: iso = "NGA"; break
        case 127: iso = "PRK"; break
        case 128: iso = "NOR"; break
        case 129: iso = "MKD"; break
        case 130: iso = "OMN"; break
        case 131: iso = "PAK"; break
        case 132: iso = "PLW"; break
        case 133: iso = "PAN"; break
        case 134: iso = "PNG"; break
        case 135: iso = "PRY"; break
        case 136: iso = "PER"; break
        case 137: iso = "PHL"; break
        case 138: iso = "POL"; break
        case 139: iso = "PRT"; break
        case 140: iso = "QAT"; break
        case 141: iso = "ROU"; break
        case 142: iso = "RUS"; break
        case 143: iso = "RWA"; break
        case 144: iso = "KNA"; break
        case 145: iso = "LCA"; break
        case 146: iso = "VCT"; break
        case 147: iso = "WSM"; break
        case 148: iso = "SMR"; break
        case 149: iso = "STP"; break
        case 150: iso = "SAU"; break
        case 151: iso = "SEN"; break
        case 152: iso = "SRB"; break
        case 153: iso = "SYC"; break
        case 154: iso = "SLE"; break
        case 155: iso = "SGP"; break
        case 156: iso = "SVK"; break
        case 157: iso = "SVN"; break
        case 158: iso = "SLB"; break
        case 159: iso = "SOM"; break
        case 160: iso = "ZAF"; break
        case 161: iso = "KOR"; break
        case 162: iso = "SSD"; break
        case 163: iso = "ESP"; break
        case 164: iso = "LKA"; break
        case 165: iso = "SDN"; break
        case 166: iso = "SUR"; break
        case 167: iso = "SWE"; break
        case 168: iso = "CHE"; break
        case 169: iso = "SYR"; break
        case 170: iso = "TJK"; break
        case 171: iso = "TZA"; break
        case 172: iso = "THA"; break
        case 173: iso = "TGO"; break
        case 174: iso = "TON"; break
        case 175: iso = "TTO"; break
        case 176: iso = "TUN"; break
        case 177: iso = "TUR"; break
        case 178: iso = "TKM"; break
        case 179: iso = "TUV"; break
        case 180: iso = "ARE"; break
        case 181: iso = "UGA"; break
        case 182: iso = "UKR"; break
        case 183: iso = "GBR"; break
        case 184: iso = "URY"; break
        case 185: iso = "USA"; break
        case 186: iso = "UZB"; break
        case 187: iso = "VUT"; break
        case 188: iso = "VEN"; break
        case 189: iso = "VNM"; break
        case 190: iso = "YEM"; break
        case 191: iso = "ZMB"; break
        case 192: iso = "ZWE"; break
        default: iso = "BLR"
      }
      return iso
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
  user: state.auth.currDisplayName

})

export default connect(mapStateToProps, { getCapitals, setDisplayName })(Login)

