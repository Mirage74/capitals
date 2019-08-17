import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
class Quiz extends Component {
    state = {
        displayName: '',
        password: '',
        redirectLogin: false,
        errors: {}
    }

render() {
    return (
        <div>
        {this.props.displayName}
        </div>
    )
}
}

export default Quiz