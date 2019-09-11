import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDisplayName } from '../actions/auth/action'
import { setCountriesList } from '../actions/list-cpt/action'
import "./quiz.css"
import MenuButtons from "./layout/menubuttons"
import ChooseLevel from "./layout/chooseLevel"
import { Redirect } from "react-router-dom"
import * as data from './const/const_caps'
import {getImageName} from "../axfunc"
import {allCapitals} from "../config"

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
        radioButtonSelected: 0,
        errors: {}
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
            this.props.setDisplayName("")
        }
    }

    getSource = (lvl) => {
        let arr = []
        let oneRec = {}
        for (let i = 0; i < allCapitals; i++) {
            if ( data.level[i] <= lvl) {
                oneRec = {}
                oneRec.capitalName = data.capitalsNames[i]
                oneRec.countryName = data.countriesNames[i]
                oneRec.ISO = getImageName(i)
                arr.push(oneRec) 
            }
        }
        //console.log("arr", arr)
        return arr
    }

    render() {
        const { displayName } = this.props
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
    displayName: state.auth.currDisplayName
})

export default connect(mapStateToProps, { setDisplayName, setCountriesList })(Quiz)

