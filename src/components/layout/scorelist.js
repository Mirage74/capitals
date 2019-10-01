import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import uuid from 'uuid'

class ScoreList extends Component {

    render() {
        const { index, cpts } = this.props
        //console.log("cpts", cpts)
        const { currSelectedValue, randArr, cardArr } = this.state

        const task = (
            <div className="row">

                <h1 id="caps-question" className="w-100 p-2 topContainer" >Please choose the capital of {cpts[index].countryName}:</h1>

            </div>
        )

        const radioList = (

    const cptNames = randArr.map(item =>
            <li id="capName-answer" className="text-center" key={uuid()}>
                <h5>{item.capitalName}</h5>
            </li>
        )


    return (
            <div className="row">
                {task}
                {radioList}
                <ul className="w-100 p-2 topContainer">{cptNames}</ul>
                <ul className="w-100 p-2 topContainer">{pics}</ul>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    user: state.auth.currUser
})

export default connect(mapStateToProps)(ScoreList)



