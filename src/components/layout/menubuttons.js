import React, { Component } from 'react'

class MenuButtons extends Component {
    
    onSubmitStartQuiz = e => {
        e.preventDefault()
        this.props.pressedButton(1)
    }

    onSubmitViewCapitals = e => {
        e.preventDefault()
        this.props.pressedButton(2)
    }

    onSubmitViewScore = e => {
        e.preventDefault()
        this.props.pressedButton(3)
    }

    onSubmitLastQuiz = e => {
        e.preventDefault()
        this.props.pressedButton(4)
    }

    onSubmitLogout = e => {
        e.preventDefault()
        this.props.pressedButton(5)
    }

    onSubmitAbout = e => {
        e.preventDefault()
        this.props.pressedButton(6)
    }
   

    render() {
               
        let menuBut

        const startQuiz = (
            <div className="col text-center">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitStartQuiz} >Start quiz</button>
            </div>
        )

        const viewCapitals = (
            <div className="col text-center">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitViewCapitals} >View capitals</button>
            </div>
        )

        const viewScore = (
            <div className="col text-center">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitViewScore} >View score</button>
            </div>
        )

        const userLastQuiz = (
            <div className="col text-center">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitLastQuiz} >Your last quiz</button>
            </div>
        )        

        const logout = (
            <div className="col text-center">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitLogout} >Logout</button>
            </div>
        )

        const about = (
            <div className="col text-center">
                <button id="btnsuper" type="submit" className="btn btn-primary" onClick={this.onSubmitAbout} >About</button>
            </div>
        )        


        menuBut = (
            <div className="row">
                {startQuiz}
                {viewCapitals}
                {viewScore}
                {userLastQuiz}
                {logout}
                {about}
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