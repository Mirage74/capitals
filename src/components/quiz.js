import React, { Component } from 'react'
import "./quiz.css"
import MenuButtons from "./layout/menubuttons"
import { Redirect } from "react-router-dom"

class Quiz extends Component {
    state = {
        redirectStartQuiz: false,
        redirectViewCapitals: false,
        redirectViewScore: false,
        redirectLogin: false,
        password: '',
        errors: {}
    }

    getMenuClickCB = (dataFromChild) => {
        console.log("getJWTcallback : ", dataFromChild)
//        this.setState({ jwt: dataFromChild })
      }

    onSubmitStartQuiz = e => {
        e.preventDefault()
        this.setState({ redirectStartQuiz: true })
    }

    onSubmitViewCapitals = e => {
        e.preventDefault()
        this.setState({ redirectViewCapitals: true })
    }

    onSubmitViewScore = e => {
        e.preventDefault()
        this.setState({ redirectViewScore: true })
    }

    onSubmitLogout = e => {
        console.log("dddd")
        e.preventDefault()
        this.setState({ redirectLogin: true })
    }

    render() {
        if (this.state.redirectStartQuiz) {
            return <Redirect to='/StartQuiz' />
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

        const {displayName} = this.props.location.state
        let forRender = (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="panel-title">{displayName}</div>
                        </div>
                        <div className="col">
                            <MenuButtons pressedButton={this.getMenuClickCB}/>
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

export default Quiz