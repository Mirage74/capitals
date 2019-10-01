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
import { updUser, cutCountriesList } from '../../actions/list-cpt/action'
import { setUser } from '../../actions/auth/action'
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
        resQuest: [],
        questFinished: false
    }


    currRadioCB = (chooseRadio) => {
        const { questFinished } = this.state
        if (!questFinished) {
            this.setState({ radioButtonSelected: "" + chooseRadio })
        }
    }

    currIndexSelectedCB = (index) => {
        const { questFinished } = this.state
        if (!questFinished) {
            this.setState({ indexSelected: index })
        }
    }

    currCorrectAnswerCB = (num) => {
        const { questFinished } = this.state
        if (!questFinished) {
            this.setState({ corrAnswer: "" + num })
        }
    }

    timeOutCB = () => {
        const { currRand, resQuest, allTasks, questFinished } = this.state
        const { cpts, user } = this.props
        const { displayName } = this.props.user
        const { levelValue } = this.props.location.state        
        this.props.cutCountriesList(cpts, currRand)
        const cptsArray = Object.keys(cpts).map(function (key) {
            return [Number(key), cpts[key]];
        });
        if (!questFinished) {
            //this.setState({ timeOut: true })
            let newRes = [...resQuest]
            let oneRec = {}
            oneRec.numTask = resQuest.length
            oneRec.questionIndex = this.countryNameToIndex(cpts[currRand].countryName)
            oneRec.answerIndex = "-1"
            newRes.push(oneRec)
            this.setState({ resQuest: newRes })
            if (newRes.length < allTasks) {
                let currRand = Math.floor(Math.random() * Math.floor(cptsArray.length))
                this.setState({ currRand: currRand })
                this.setState({ timeForTurnInSec: this.state.timeForTurnInSecInitial })
            } else {


                let userScore = this.calcScore(newRes)
                if (userScore < user.bestScore[levelValue]) {
                    userScore = user.bestScore[levelValue]
                }
                console.log("userScore", userScore) 
                let tmpLastRes = [...user.lastRes]
                tmpLastRes[levelValue] = newRes
                let tmpScore = [...user.bestScore]
                tmpScore[levelValue] = userScore
                let updatedUser = {
                    displayName: displayName,
                    bestScore: tmpScore,
                    lastRes: tmpLastRes
                }
                let updatedUserRedux = updatedUser               
                updatedUserRedux._id = user._id
                this.props.updUser(updatedUser)
                    .then(res => {
                        this.props.setUser(updatedUserRedux)
                            .then(res => {
                                this.setState({ questFinished: true })
                            })
                    }) 
                    .catch(err => {
                        console.log("Error update user, component startQuiz", err)
                      })                    
            }
        }
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

    calcScore = (arr) => {
        let cnt = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].questionIndex === arr[i].answerIndex) {
                cnt++
            }
        }
        return cnt
    }

    handleConfClick = e => {
        e.preventDefault()
        const { indexSelected, currRand, resQuest, allTasks, questFinished, radioButtonSelected } = this.state
        const { levelValue } = this.props.location.state
        const { cpts, user } = this.props
        const { displayName } = this.props.user
        if ( (!questFinished) && (parseInt(radioButtonSelected) > -1) ) {
            console.log("cpts BEF", cpts)
            console.log("cpts BEF length", cpts.length)
            this.props.cutCountriesList(cpts, currRand)
            console.log("cpts AFT ", cpts)
            console.log("cpts AFT length", cpts.length)
            const cptsArray = Object.keys(cpts).map(function (key) {
                return [Number(key), cpts[key]];
            })
            console.log("cptsArray", cptsArray)
            console.log("cptsArray length", cptsArray.length)
            let newRes = [...resQuest]
            let oneRec = {}
            oneRec.numTask = resQuest.length
            oneRec.questionIndex = this.countryNameToIndex(cpts[currRand].countryName)
            oneRec.answerIndex = indexSelected
            newRes.push(oneRec)
            this.setState({ resQuest: newRes })
            if (newRes.length < allTasks) {
                this.setState({radioButtonSelected: -1})
                let currRand = Math.floor(Math.random() * Math.floor(cptsArray.length))
                this.setState({ currRand: currRand })
                this.setState({ timeForTurnInSec: this.state.timeForTurnInSecInitial })
            } else {
                let userScore = this.calcScore(newRes)
                if (userScore < user.bestScore[levelValue]) {
                    userScore = user.bestScore[levelValue]
                }
                console.log("userScore", userScore) 
                let tmpLastRes = [...user.lastRes]
                tmpLastRes[levelValue] = newRes
                let tmpScore = [...user.bestScore]
                tmpScore[levelValue] = userScore
                let updatedUser = {
                    displayName: displayName,
                    bestScore: tmpScore,
                    lastRes: tmpLastRes
                }
                let updatedUserRedux = updatedUser               
                updatedUserRedux._id = user._id                
                this.props.updUser(updatedUser)
                    .then(res => {
                        this.props.setUser(updatedUserRedux)
                            .then(res => {
                                this.setState({ questFinished: true })
                            })
                    }) 
            }
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


    isEmptyObj = object => !Object.getOwnPropertySymbols(object).length && !Object.getOwnPropertyNames(object).length

    componentDidMount() {
        const { levelValue } = this.props.location.state
        const { displayName, cpts } = this.props
        const cptsArray = Object.keys(cpts).map(function (key) {
            return [Number(key), cpts[key]];
        })

        this.setState({ displayName: displayName })
        let timeForAnsw = 0
        if (levelValue === "0") {
            timeForAnsw = TIME_PER_TURN_EASY
            this.setState({ allTasks: ALL_TASKS_EASY })
        }
        if (levelValue === "1") {
            timeForAnsw = TIME_PER_TURN_MIDDLE
            this.setState({ allTasks: ALL_TASKS_MIDDLE })
        }

        if (levelValue === "2") {
            timeForAnsw = TIME_PER_TURN_HARD
            this.setState({ allTasks: ALL_TASKS_HARD })
        }
        this.setState({ timeForTurnInSecInitial: timeForAnsw })
        this.setState({ timeForTurnInSec: timeForAnsw })

        if (this.isEmptyObj(cpts) || (cpts.length === 0)) {
            this.setState({ redirectQuiz: true })
        }
        let currRand = Math.floor(Math.random() * Math.floor(cptsArray.length))
        this.setState({ currRand: currRand })
    }


    render() {
        const { redirectQuiz, currRand, timeForTurnInSec, timeForTurnInSecInitial, questFinished, resQuest } = this.state
        const { user, cpts } = this.props
        let forRender, oneTask
        // console.log("oneTask currRand", currRand)
        // console.log("oneTask cpts", cpts)
        // console.log("oneTask cpts.length", cpts.length)
        

        if (this.isEmptyObj(cpts) || (cpts.length === 0)) {
            forRender = (<div></div>)
        } else {

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
                if (redirectQuiz || (user.displayName.length === 0)) {
                    return <Redirect to={{
                        pathname: 'Quiz',
                        state: {
                        }
                    }}
                    />
                }


                if (!this.isEmptyObj(cpts)) {
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
                                        <h1 className="text-center">Hello, {user.displayName} !</h1>
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
        }
        if (redirectQuiz || (user.displayName.length === 0)) {
            return <Redirect to={{
                pathname: 'Quiz',
                state: {
                }
            }}
            />
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
    user: state.auth.currUser

})



export default connect(mapStateToProps, { setUser, updUser, cutCountriesList })(StartQuiz)
