import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUser } from '../actions/auth/action'
import { setCountriesList } from '../actions/list-cpt/action'
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

 
async componentDidMount() {        
    let dn = this.props.user.displayName
    //console.log("dn 1", dn)
    if (dn.length === 0) {
        dn = this.props.location.state.displayName
        //console.log("dn 2", dn)
    }
        const res = await axios.get(backendPath + `${dn}`)
        const compareID = res.data._id === this.props.user._id 
        console.log("res.data._id", res.data._id)
        console.log("this.props.user._id", this.props.user._id)
        const compareDisplayName = res.data.displayName === this.props.user.displayName 
        const compareBestScore = res.data.bestScore === this.props.user.bestScore 
        console.log("compareID", compareID, compareDisplayName, compareBestScore)
         
         if (! (compareID && compareDisplayName && compareBestScore) ) {
            store.remove("persist:" + KEY_PERSIST_STORE)
            this.setState({ redirectLogin: true })
            this.props.setUser({})
         }
    }    

    currRadioCB = (chooseRadio) => {
        this.setState({ radioButtonSelected: chooseRadio })
    }
    getMenuClickCB = (dataFromChild) => {
        if (dataFromChild === 1) {
            this.setState({ redirectStartQuiz: true })
        }
        if (dataFromChild === 2) {
            this.setState({ redirectViewCapitals: true })
        }
        if (dataFromChild === 3) {
            this.setState({ redirectViewScore: true })
        }
        if (dataFromChild === 4) {
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
        //console.log("arr getsour", arr)
        return arr
    }

    render() {
        const { displayName } = this.props.user
        if (this.state.redirectStartQuiz) {
            let arr = this.getSource(this.state.radioButtonSelected)
            this.props.setCountriesList(arr)
            //console.log("arr redir", arr)
            return <Redirect to={{
                pathname: 'StartQuiz',
                state: {
                    radioButtonSelected: this.state.radioButtonSelected
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
            return <Redirect to='/Login' />
        }


        let forRender = (
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



        return (
            <div>
                {forRender}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.currUser
})

export default connect(mapStateToProps, { setUser, setCountriesList })(Quiz)

