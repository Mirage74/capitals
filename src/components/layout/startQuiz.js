import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import * as data from '../const/const_caps'
import OneTask from "./oneTask"
import { allCapitals, TIME_PER_TURN_EASY, TIME_PER_TURN_MIDDLE, TIME_PER_TURN_HARD, ALL_TASKS_EASY, ALL_TASKS_MIDDLE, ALL_TASKS_HARD } from "../../config"

class StartQuiz extends Component {
    state = {
        currTask: 0,
        timeForTurnInSec: 0,
        allTasks: 0,
        cpt: [],
        radioButtonSelected: -1,
        currRand: -1,
        redirectLogin: false,
        redirectQuiz: false
    }

    currRadioCB = (chooseRadio) => {
        this.setState({ radioButtonSelected: chooseRadio })
    }

    getSource = (lvl) => {
        let arr = []
        let oneRec = {}
        for (let i = 0; i < allCapitals; i++) {
            if (data.level[i] <= lvl) {
                oneRec = {}
                oneRec.capitalName = data.capitalsNames[i]
                oneRec.countryName = data.countriesNames[i]
                arr.push(oneRec)
            }
        }
        return arr
    }


    componentDidMount() {
        const { radioButtonSelected } = this.props.location.state
        const { displayName, cpts } = this.props
        this.setState({ displayName: displayName })
        if (radioButtonSelected === "0") {
            this.setState({ timeForTurnInSec: TIME_PER_TURN_EASY })
            this.setState({ allTasks: ALL_TASKS_EASY })
        }
        if (radioButtonSelected === "1") {
            this.setState({ timeForTurnInSec: TIME_PER_TURN_MIDDLE })
            this.setState({ allTasks: ALL_TASKS_MIDDLE })
        }

        if (radioButtonSelected === "2") {
            this.setState({ timeForTurnInSec: TIME_PER_TURN_HARD })
            this.setState({ allTasks: ALL_TASKS_HARD })
        }
        if (cpts.length === 0) {
            this.setState({ redirectQuiz: true })
        }
        let currRand = Math.floor(Math.random() * Math.floor(cpts.length))
        this.setState({ currRand: currRand })
    }


    render() {
        const { redirectQuiz, currRand, timeForTurnInSec } = this.state
        const { displayName, cpts } = this.props
        if (redirectQuiz || (displayName.length === 0)) {
            return <Redirect to={{
                pathname: 'Quiz',
                state: {
                }
            }}
            />
        }
        let forRender
        if (cpts.length > 0) {
            if (currRand > -1) {
                forRender = (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h1 className="text-center">Hello, {displayName} !</h1>
                                    <br />
                                    <OneTask index={currRand} currButton={this.currRadioCB} timeForTurnInSec={timeForTurnInSec} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                forRender = (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h1 className="text-center">Hello, {displayName} !</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div>
                <h1>{forRender}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    cpts: state.listCapitals.currCountriesList,
    displayName: state.auth.currDisplayName

})


export default connect(mapStateToProps)(StartQuiz)
