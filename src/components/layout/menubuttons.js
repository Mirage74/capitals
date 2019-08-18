import React, { Component } from 'react'

class MenuButtons extends Component {
    render() {
        const { onSubmitStartQuiz, onSubmitViewCapitals, onSubmitViewScore, onSubmitLogout, pressedButton } = this.props
       
        let menuBut

        const startQuiz = (
            <div className="col">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={onSubmitStartQuiz} >Start Quiz</button>
            </div>
        )

        const viewCapitals = (
            <div className="col">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={onSubmitViewCapitals} >View all capitals</button>
            </div>
        )

        const viewScore = (
            <div className="col">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={onSubmitViewScore} >View Score</button>
            </div>
        )

        const logout = (
            <div className="col">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={pressedButton("3334r21")} >Logout</button>
            </div>
        )


        menuBut = (
            <div className="row">
                {startQuiz}
                {viewCapitals}
                {viewScore}
                {logout}
            </div>
        )

        return (
            <div>
                {menuBut}
            </div>
        )

    }
}
export default MenuButtons