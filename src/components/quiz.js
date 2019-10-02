import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUser } from '../actions/auth/action'
import { setCountriesList, setUsersList } from '../actions/list-cpt/action'
import axios from 'axios'
import store from 'store'
import "./quiz.css"
import MenuButtons from "./layout/menubuttons"
import ChooseLevel from "./layout/chooseLevel"
import { Redirect } from "react-router-dom"
import * as data from './const/const_caps'
import { getImageName } from "../axfunc"
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
        redirectLogin: false,
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

    async componentDidUpdate (prevProps) {

        // console.log("componentDidUpdate prev", prevProps.usersList)
        // console.log("componentDidUpdate props", this.props.usersList)
    }
    async componentDidMount() {
        this._isMounted = true        
        const { user, usersList, setUsersList } = this.props
        console.log("quiz usersList ", usersList)
        //console.log("user DM", user)
        if (typeof user === 'object' && user !== null && !this.isEmptyObject(user)) {
            await setUsersList(usersList, 3)
            //console.log("quiz usersList 0", usersList)
//            console.log("quiz usersList 0000 ", usersList)            
            // await setUsersList(usersList, 1)
            // await setUsersList(usersList, 2)
            // console.log("quiz user", user)
            // console.log("this.props.location.state", this.props.location.state)
            let dn = user.displayName
            if (dn.length === 0) {
                dn = this.props.location.state.displayName
            }
            const res = await axios.get(backendPath + `${dn}`)
            // console.log("res.data", res.data)
            // console.log("this.props.user", this.props.user)
            const compareID = res.data._id === user._id
            const compareDisplayName = res.data.displayName === user.displayName
            // console.log("res.data.bestScore[0]", res.data.bestScore[0])
            // console.log("user.bestScore[0]", user.bestScore[0]) 
            // console.log("is equasl ?", `${res.data.bestScore[0]} = ${user.bestScore[0]}`)
            const compareBestScore = res.data.bestScore[0] === user.bestScore[0]
//            console.log("compare", compareID, compareDisplayName, compareBestScore)
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
        if ( (dataFromChild === 1) && (this._isMounted) ){
            this.setState({ redirectStartQuiz: true })
        }
        if ( (dataFromChild === 2) && (this._isMounted) ) {
            this.setState({ redirectViewCapitals: true })
        }
        if ( (dataFromChild === 3) && (this._isMounted) ) {
            this.setState({ redirectViewScore: true })
        }
        if ( (dataFromChild === 4) && (this._isMounted) ) {
            console.log("redirect login 3")            
            this.setState({ redirectLogin: true })
            this.props.setUser("")
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
        const { user } = this.props
        let forRender
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

            if (this.state.redirectViewCapitals) {
                return <Redirect to='/ViewCapitals' />
            }

            if (this.state.redirectViewScore) {
                return <Redirect to='/ViewScore' />
            }

            if (this.state.redirectLogin) {
                console.log("redirectLoginredirectLoginredirectLoginredirectLoginredirectLogin")
                return <Redirect to='/Login' />
            }


            forRender = (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1 className="text-center">Hello, {displayName} !</h1>
                                <MenuButtons pressedButton={this.getMenuClickCB} />
                            </div>
                            <div className="col">
                                <ChooseLevel currButton={this.currRadioCB} />
                            </div>
                        </div>
                    </div>
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
