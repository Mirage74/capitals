import React, { Component } from 'react'
import { RadioGroup, Radio } from 'react-radio-group'
import {allCapitals} from "../../config"

class ChooseLevel extends Component {
    handleChange = (value) => {
        this.setState({ selectedValue: value });
        this.props.currButton(value)

    }
    render() {
        return (
            <div>
            <h3 className="text-left">Please choose your level:</h3>
            <br/>
            <RadioGroup className="text-left"
                name="fruit"
                selectedValue = "0"
                onChange={this.handleChange}>
                <label>
                    <Radio value="0" />EASY: 65 capitals and 5 seconds per turn
                </label>
                <label>
                    <Radio value="1" />MIDDLE: 130 capitals and 4 seconds per turn
                </label>
                <label>
                    <Radio value="2" />HARD: {allCapitals} capitals and 3 seconds per turn
                </label>
            </RadioGroup>
            </div>
        )
    }
}


export default ChooseLevel

