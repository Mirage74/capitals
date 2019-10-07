import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUser } from '../actions/auth/action'
import { setCountriesList, setUsersList } from '../actions/list-cpt/action'
import axios from 'axios'
import store from 'store'
import "./quiz.css"
import MenuButtons from "./layout/menubuttons"
import ScoreList from "./layout/scorelist"
import ChooseLevel from "./layout/chooseLevel"
import { Redirect } from "react-router-dom"
import * as data from './const/const_caps'
import { getImageName } from "../axfunc"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { allCapitals, backendPath, KEY_PERSIST_STORE } from "../config"

class Quiz extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.getMenuClickCB = this.getMenuClickCB.bind(this)
    }

    state = {
        redirectStartQuiz: false,
        redirectViewCapitals: false,
        redirectViewScore: false,
        redirectLastQuiz: false,
        redirectLogin: false,
        redirectAbout: false,
        radioButtonSelected: -1,
        errors: {}
    }
    isEmptyObject = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false
        }
        return true
    }


    async componentDidMount() {
        this._isMounted = true
        const { user, setUser, setUsersList  } = this.props
        if (typeof user === 'object' && user !== null && !this.isEmptyObject(user) ) {
            await setUsersList(3)
            let dn = user.displayName
            if (dn.length === 0) {
                dn = this.props.location.state.displayName
            }
            const res = await axios.get(backendPath + `${dn}`)
            const compareID = res.data._id === user._id
            const compareDisplayName = res.data.displayName === user.displayName
            const compareBestScore = res.data.bestScore[0] === user.bestScore[0]
            if (!(compareID && compareDisplayName && compareBestScore)) {
                store.remove("persist:" + KEY_PERSIST_STORE)
                if (this._isMounted) {
                    console.log("redirect login 1")
                    this.setState({ redirectLogin: true })
                }
                this.props.setUser({})
            }
        } else {
            store.remove("persist:" + KEY_PERSIST_STORE)
            this.props.setUser({})
            if (this._isMounted) {
                console.log("redirect login 2")
                setUser("")
                setUsersList(-1)                
                this.setState({ redirectLogin: true })
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    currRadioCB = (chooseRadio) => {
        if (this._isMounted) {
            this.setState({ radioButtonSelected: chooseRadio })
        }
    }
    getMenuClickCB = (dataFromChild) => {
        if ((dataFromChild === 1) && (this._isMounted)) {
            this.setState({ redirectStartQuiz: true })
        }
        if ((dataFromChild === 2) && (this._isMounted)) {
            this.setState({ redirectViewCapitals: true })
        }
        if ((dataFromChild === 3) && (this._isMounted)) {
            this.setState({ redirectViewScore: true })
        }
        if ((dataFromChild === 4) && (this._isMounted)) {
            this.setState({ redirectLastQuiz: true })
        }
        if ((dataFromChild === 5) && (this._isMounted)) {
            this.setState({ redirectLogin: true })
            this.props.setUser("")
            this.props.setUsersList(-1)
        }
        if ((dataFromChild === 6) && (this._isMounted)) {
            this.setState({ redirectAbout: true })
        }

    }

    getSource = (lvl) => {
        let arr = []
        let oneRec = {}
        for (let i = 0; i < allCapitals; i++) {
            if (data.level[i] <= lvl) {
                oneRec = {}
                oneRec.capitalName = data.capitalsNames[i]
                oneRec.countryName = data.countriesNames[i]
                oneRec.ISO = getImageName(i)
                arr.push(oneRec)
            }
        }
        return arr
    }

    render() {
        const { user, usersList } = this.props


        if (this.state.redirectViewCapitals) {
            return <Redirect to='/ViewCapitals' />
        }

        if (this.state.redirectViewScore) {
            return <Redirect to='/ViewScore' />
        }

        if (this.state.redirectLastQuiz) {
            return <Redirect to={{
                pathname: 'LastQuiz',
                state: {
                    lvl: 0
                }
            }}
            />
        }


        if (this.state.redirectLogin) {
            return <Redirect to='/Login' />
        }

        if (this.state.redirectAbout) {
            return <Redirect to={{
                pathname: 'About',
                state: {
                    isAuth: true
                }
            }}
            />
        }


        let forRender
        if (usersList && (usersList.length === 3)) {

            console.log("quiz usersList", usersList)
            console.log("quiz usersList.length", usersList.length)

            if (user !== "Login failed") {
                const { displayName } = this.props.user
                if (this.state.redirectStartQuiz) {
                    let arr = this.getSource(this.state.radioButtonSelected)
                    this.props.setCountriesList(arr)
                    return <Redirect to={{
                        pathname: 'StartQuiz',
                        state: {
                            levelValue: this.state.radioButtonSelected
                        }
                    }}
                    />
                }



                forRender = (
                    <div>
                        <Row>
                            <Col md={{ span: 2, offset: 1 }} >
                                <MenuButtons pressedButton={this.getMenuClickCB} />
                            </Col>
                            <Col md={{ span: 6, offset: 1 }}>
                                <ChooseLevel currButton={this.currRadioCB} displayName={displayName} />
                                <br />
                                <ScoreList />
                            </Col>
                        </Row>
                    </div>
                )

            } else {
                if (this.state.redirectLogin) {
                    return <Redirect to='/Login' />
                }
                forRender = (
                    <div></div>
                )
            }
        } else {
            forRender = (<></>)
        }

        return (
            <div>
                {forRender}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.currUser,
    usersList: state.listCapitals.currUserList
})

export default connect(mapStateToProps, { setUser, setCountriesList, setUsersList })(Quiz)

