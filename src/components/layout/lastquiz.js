import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import "../quiz.css"
import uuid from 'uuid'
import * as data from '../const/const_caps'
import { RadioGroup, Radio } from 'react-radio-group'
import { checkAuth } from './viewax/axfview'

class LastQuiz extends Component {
    state = {
        redirectQuiz: false,
        currSelectedRadio: "0"
    }

    handleBack = e => {
        e.preventDefault()
        this.setState({ redirectQuiz: true })
    }



    componentDidMount() {
        const { user, usersList } = this.props
        if (checkAuth(user, usersList)) {
            const { lvl } = this.props.location.state
            if ((lvl === 0) || (lvl === 1) || (lvl === 2) || (lvl === "0") || (lvl === "1") || (lvl === "2")) {
                this.setState({ currSelectedRadio: "" + lvl })
            }
        }
    }

    handleChange = (value) => {
        this.setState({ currSelectedRadio: value })
    }

    isRight = (item) => {
        return item.questionIndex === item.answerIndex
    }

    isTimeout = (item) => {
        return item.answerIndex === -1
    }

    isWrong = (item) => {
        return ((item.answerIndex !== -1) && (item.questionIndex !== item.answerIndex))
    }


    isEmptyObject = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false
        }
        return true
    }


    render() {
        const { redirectQuiz, currSelectedRadio } = this.state
        const { user, usersList } = this.props

        if (!checkAuth(user, usersList)) {
            return <Redirect to='/Login' />
        }

        if (redirectQuiz) {
            return <Redirect to={{
                pathname: 'Quiz',
                state: {
                }
            }}
            />
        }

        let forRender

        if (!(this.isEmptyObject(user.lastRes[0])) || (!this.isEmptyObject(user.lastRes[1])) || !(this.isEmptyObject(user.lastRes[2]))) {

            let qstIndex, aswIndex
            let rigthArr = []
            let timeOutArr = []
            let wrongArr = []
            if (!(this.isEmptyObject(user.lastRes[currSelectedRadio]))) {
                rigthArr = [...user.lastRes[currSelectedRadio].filter(this.isRight)]
                timeOutArr = [...user.lastRes[currSelectedRadio].filter(this.isTimeout)]
                wrongArr = [...user.lastRes[currSelectedRadio].filter(this.isWrong)]
            }

            for (let i = 0; i < rigthArr.length; i++) {
                qstIndex = rigthArr[i].questionIndex
                rigthArr[i].countryName = data.countriesNames[qstIndex]
                rigthArr[i].capitalNameRight = data.capitalsNames[qstIndex]
            }


            for (let i = 0; i < timeOutArr.length; i++) {
                qstIndex = timeOutArr[i].questionIndex
                timeOutArr[i].countryName = data.countriesNames[qstIndex]
                timeOutArr[i].capitalNameRight = data.capitalsNames[qstIndex]
            }

            for (let i = 0; i < wrongArr.length; i++) {
                qstIndex = wrongArr[i].questionIndex
                aswIndex = wrongArr[i].answerIndex
                wrongArr[i].countryName = data.countriesNames[qstIndex]
                wrongArr[i].capitalNameRight = data.capitalsNames[qstIndex]
                wrongArr[i].capitalNameWrong = data.capitalsNames[aswIndex]
            }

            let headerTab = (
                <Row style={{ fontSize: "1.5rem" }} className="justify-content-md-center" >
                    <Col md={{ span: 2, offset: 3 }}>
                        <b>Country:</b>
                    </Col>
                    <Col md={{ span: 2, offset: 1 }}>
                        <b>Capital:</b>
                    </Col>
                    <Col md={{ span: 2, offset: 1 }}>
                        <b>Your answer:</b>
                    </Col>
                </Row>

            )

            let rightRows = rigthArr.map(item =>
                <Row key={uuid()}>
                    <Col className="row-last-quiz-green" md={{ span: 2, offset: 3 }}>
                        {item.countryName}
                    </Col>
                    <Col className="row-last-quiz-green" md={{ span: 2, offset: 1 }}>
                        {item.capitalNameRight}
                    </Col>
                    <Col className="row-last-quiz-green" md={{ span: 2, offset: 1 }}>
                        {item.capitalNameRight}
                    </Col>
                </Row>
            )

            let timeoutRows = timeOutArr.map(item =>
                <Row key={uuid()}>
                    <Col className="row-last-quiz-yellow" md={{ span: 2, offset: 3 }}>
                        {item.countryName}
                    </Col>
                    <Col className="row-last-quiz-yellow" md={{ span: 2, offset: 1 }}>
                        {item.capitalNameRight}
                    </Col>
                    <Col className="row-last-quiz-yellow" md={{ span: 2, offset: 1 }}>
                        <b>No answer</b>
                    </Col>
                </Row>
            )

            let wrongRows = wrongArr.map(item =>
                <Row key={uuid()}>
                    <Col className="row-last-quiz-red" md={{ span: 2, offset: 3 }}>
                        {item.countryName}
                    </Col>
                    <Col className="row-last-quiz-red" md={{ span: 2, offset: 1 }}>
                        {item.capitalNameRight}
                    </Col>
                    <Col className="row-last-quiz-red-2" md={{ span: 2, offset: 1 }}>
                        {item.capitalNameWrong}
                    </Col>
                </Row>
            )



            let chooseLvl = (
                <RadioGroup className="text-left"
                    name="sort"
                    selectedValue={currSelectedRadio}
                    onChange={this.handleChange}>
                    <label>
                        <Radio value="0" /><b className="radio-myfont">Easy</b>
                    </label>
                    <label>
                        <Radio value="1" /><b className="radio-myfont">Middle</b>
                    </label>
                    <label>
                        <Radio value="2" /><b className="radio-myfont">Hard </b>
                    </label>
                </RadioGroup>
            )
            let strRes = ` last result: (${rigthArr.length}/${user.lastRes[currSelectedRadio].length})`

            forRender = (<>
                <Row>
                    <Col md={{ span: 5 }}>
                        <Button onClick={this.handleBack}>Back</Button>
                    </Col>
                    <Col md={{ span: 4 }}>
                        <h2 className="display-6">
                            <b>{user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}</b>{strRes}
                        </h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    {chooseLvl}
                </Row>
                <br />
                {headerTab}
                <br />
                {rightRows}
                {timeoutRows}
                {wrongRows}
                <Row>
                    <Col>
                        <Button onClick={this.handleBack}>Back</Button>
                    </Col>
                </Row>
            </>
            )
        } else {
            forRender = (
                <div>
                    <h3>No quiz passed yet</h3>
                    <Row>
                        <Col>
                            <Button onClick={this.handleBack}>Back</Button>
                        </Col>
                    </Row>
                </div>
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

export default connect(mapStateToProps)(LastQuiz)
