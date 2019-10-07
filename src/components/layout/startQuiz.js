import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import OneTask from "./oneTask"
import "../quiz.css"
import { calcScore, countryNameToIndex } from './Start/axf'
import {checkAuth} from './viewax/axfview'
import Countdown from './stopwatch'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { cutCountriesList } from '../../actions/list-cpt/action'
import { setUser, updUser } from '../../actions/auth/action'
import { TIME_PER_TURN_EASY, TIME_PER_TURN_MIDDLE, TIME_PER_TURN_HARD, ALL_TASKS_EASY, ALL_TASKS_MIDDLE, ALL_TASKS_HARD } from "../../config"

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
        redirectLastQuiz: false,
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


    finishQuiz = async (newRes, levelValue) => {
        const { user, updUser, setUser } = this.props
        let userScore = calcScore(newRes)
        if (userScore < user.bestScore[levelValue]) {
            userScore = user.bestScore[levelValue]
        }
        //console.log("userScore", userScore)

        let tmpLastRes = [...user.lastRes]
        tmpLastRes[levelValue] = newRes
        let tmpScore = [...user.bestScore]
        tmpScore[levelValue] = userScore

        let updatedUser = {
            displayName: user.displayName,
            bestScore: tmpScore,
            lastRes: tmpLastRes
        }

        let updatedUserRedux = updatedUser
        updatedUserRedux._id = user._id
        await updUser(updatedUser)
            .catch(err => {
                console.log("Error update user, component startQuiz", err)
            })
        //console.log("updated: ", res)

        await setUser(updatedUserRedux)
            .catch(err => {
                console.log("Error setUser, component startQuiz", err)
            })


        this.setState({ redirectLastQuiz: true })


    }

    nextTask = () => {
        const { currRand, resQuest, allTasks, indexSelected } = this.state
        const { cpts, cutCountriesList } = this.props
        const { levelValue } = this.props.location.state
        let newRes = [...resQuest]
        let oneRec = {}
        oneRec.numTask = resQuest.length
        oneRec.questionIndex = countryNameToIndex(cpts[currRand].countryName)
        oneRec.answerIndex = indexSelected
        newRes.push(oneRec)
        this.setState({ resQuest: newRes })
        const newCpts = [...cpts]
        newCpts.splice(currRand, 1)
        cutCountriesList(newCpts)
        // console.log("newRes.length", newRes.length)
        // console.log("allTasks", allTasks)
        if (newRes.length < allTasks) {
            this.setState({ radioButtonSelected: -1 })
            let currRand = Math.floor(Math.random() * Math.floor(newCpts.length))
            this.setState({ currRand: currRand })
            this.setState({ timeForTurnInSec: this.state.timeForTurnInSecInitial })
        } else {
            this.setState({ questFinished: true })
            this.finishQuiz(newRes, levelValue)
        }
    }

    timeOutCB = () => {
        const { questFinished } = this.state
        this.setState({ indexSelected: -1 })
        if (!questFinished) {
            this.nextTask()
        } 
    }


    handleConfClick = e => {
        e.preventDefault()
        const { questFinished, radioButtonSelected } = this.state
        //console.log("radioButtonSelected", radioButtonSelected)
        if (parseInt(radioButtonSelected) > -1) {
            if (!questFinished)  {
                this.nextTask()
            }
        }
    }

    handleCancel = e => {
        e.preventDefault()
        this.setState({ redirectQuiz: true })
    }


    isEmptyObj = object => !Object.getOwnPropertySymbols(object).length && !Object.getOwnPropertyNames(object).length

    componentDidMount() {
        if (this.props.location.state) {
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
        } else {
            this.setState({ redirectQuiz: true })
        }
    }


    render() {
        const { redirectQuiz, currRand, timeForTurnInSec, timeForTurnInSecInitial, resQuest, allTasks, questFinished } = this.state
        const { user, usersList, cpts } = this.props

        if (!checkAuth(user, usersList))  {
            return <Redirect to='/Login' />
        }

        const { levelValue } = this.props.location.state
        let forRender, oneTask


        if (this.state.redirectLastQuiz) {
            return <Redirect to={{
              pathname: 'LastQuiz',
              state: {
                lvl: levelValue
              }
            }}
            />
          }   


        let currTask = resQuest.length + 1
        if (currTask > allTasks) {
            currTask = allTasks
        }
        const currTaskNum = (
            <div>
                {currTask}/{allTasks}
            </div>
        )

        if ( this.isEmptyObj(cpts) || (cpts.length === 0) || questFinished  ) {
            forRender = (<div></div>)
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
                                    <h1 className="text-center">Hello, {user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)} !</h1>
                                    <Row>
                                        <Col md={{ span: 2, offset: 8 }}>
                                            {buttonConf}
                                        </Col>
                                        <Col>
                                            <Countdown timeForTurnInSec={timeForTurnInSecInitial} timeOutCB={this.timeOutCB} index={currRand} />
                                            {currTaskNum}
                                        </Col>
                                    </Row>
                                    {oneTask}
                                    <br /><br /><br />
                                    <Button variant="danger" onClick={this.handleCancel}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

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
    user: state.auth.currUser,
    usersList: state.listCapitals.currUserList    
})



export default connect(mapStateToProps, { setUser, updUser, cutCountriesList })(StartQuiz)

