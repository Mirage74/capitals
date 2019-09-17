import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'
import { Redirect } from "react-router-dom"
import * as data from '../const/const_caps'
import OneTask from "./oneTask"
import "../quiz.css"
import Countdown from './stopwatch'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { allCapitals, TIME_PER_TURN_EASY, TIME_PER_TURN_MIDDLE, TIME_PER_TURN_HARD, ALL_TASKS_EASY, ALL_TASKS_MIDDLE, ALL_TASKS_HARD } from "../../config"

class StartQuiz extends Component {
    state = {
        timeForTurnInSec: 0,
        timeForTurnInSecInitial: 0,
        allTasks: 0,
        cpt: [],
        radioButtonSelected: "-1",
        indexSelected: -1,
        corrAnswer: "-2",
        currRand: -1,
        redirectLogin: false,
        redirectQuiz: false,
        timeOut: false,
        resQuest: [],
        questFinished: false
    }

    currRadioCB = (chooseRadio) => {
        this.setState({ radioButtonSelected: "" + chooseRadio })
    }

    currIndexSelectedCB = (index) => {
        this.setState({ indexSelected: index })
    }

    currCorrectAnswerCB = (num) => {
        this.setState({ corrAnswer: "" + num })
        //console.log("corrAnswer", num)
    }

    timeOutCB = () => {
        this.setState({ timeOut: true })
        let currRand = Math.floor(Math.random() * Math.floor(this.props.cpts.length))
        this.setState({ currRand: currRand })
        this.setState({ timeForTurnInSec: this.state.timeForTurnInSecInitial })
    }

    countryNameToIndex = (cn) => {
        let found = false
        let i = 0
        while (!found && (i < allCapitals)) {
            if (data.countriesNames[i] === cn) {
                found = true
                return i
            }
            i++
        }
        if (!found) {
            console.log("CountryName not found: ", cn)
        }
    }

    handleConfClick = e => {
        e.preventDefault()
        const { indexSelected, currRand, resQuest, allTasks } = this.state
        let newRes = [...resQuest]
        let oneRec = {}
        oneRec.numTask = resQuest.length
        oneRec.questionIndex = this.countryNameToIndex(this.props.cpts[currRand].countryName)
        oneRec.answerIndex = indexSelected
        newRes.push(oneRec)
        this.setState({ resQuest: newRes })
        if (newRes.length < allTasks) {
            let currRand = Math.floor(Math.random() * Math.floor(this.props.cpts.length))
            this.setState({ currRand: currRand })
            this.setState({ timerStop: true })
            this.setState({ timeForTurnInSec: this.state.timeForTurnInSecInitial })
        } else {
            this.setState({ questFinished: true })
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
                arr.push(oneRec)
            }
        }
        return arr
    }


    componentDidMount() {
        const { radioButtonSelected } = this.props.location.state
        const { displayName, cpts } = this.props
        this.setState({ displayName: displayName })
        let timeForAnsw = 0
        if (radioButtonSelected === "0") {
            timeForAnsw = TIME_PER_TURN_EASY
            this.setState({ allTasks: ALL_TASKS_EASY })
        }
        if (radioButtonSelected === "1") {
            timeForAnsw = TIME_PER_TURN_MIDDLE
            this.setState({ allTasks: ALL_TASKS_MIDDLE })
        }

        if (radioButtonSelected === "2") {
            timeForAnsw = TIME_PER_TURN_HARD
            this.setState({ allTasks: ALL_TASKS_HARD })
        }
        this.setState({ timeForTurnInSecInitial: timeForAnsw })
        this.setState({ timeForTurnInSec: timeForAnsw })
        if (cpts.length === 0) {
            this.setState({ redirectQuiz: true })
        }
        let currRand = Math.floor(Math.random() * Math.floor(cpts.length))
        this.setState({ currRand: currRand })
    }


    render() {
        const { redirectQuiz, currRand, timeForTurnInSec, timeForTurnInSecInitial, questFinished, resQuest } = this.state
        const { displayName, cpts } = this.props
        let forRender, oneTask
        if (questFinished) {

            const list = resQuest.map(item =>
                <li id="quest-res" className="text-center" key={uuid()}>
                    <h5>{item.numTask}</h5>
                    <h5>{item.questionIndex}</h5>
                    <h5>{item.answerIndex}</h5>
                </li>
            )
            forRender = <ul className="w-100 p-2 topContainer">{list}</ul>
        } else {

            const buttonConf = (
                <input
                    type="submit"
                    value="Confirm"
                    className="btn btn-primary"
                    onClick={this.handleConfClick}
                />
            )
            if (redirectQuiz || (displayName.length === 0)) {
                return <Redirect to={{
                    pathname: 'Quiz',
                    state: {
                    }
                }}
                />
            }


            if (cpts.length > 0) {
                if (currRand > -1) {
                    oneTask = <OneTask index={currRand} currButton={this.currRadioCB} correctAnswer={this.currCorrectAnswerCB} timeForTurnInSec={timeForTurnInSec} indexSelected={this.currIndexSelectedCB} />
                } else {
                    oneTask = <div></div>
                }

                forRender = (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h1 className="text-center">Hello, {displayName} !</h1>
                                    <Row>
                                        <Col md={{ span: 2, offset: 8 }}>
                                            {buttonConf}
                                        </Col>
                                        <Col>
                                            <Countdown timeForTurnInSec={timeForTurnInSecInitial} timeOutCB={this.timeOutCB} index={currRand} />
                                        </Col>
                                    </Row>
                                    {oneTask}
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
