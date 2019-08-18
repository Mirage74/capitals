import React, { Component } from 'react'
import { RadioGroup, Radio } from 'react-radio-group'
import * as data from '../const/const_caps';
import {allCapitals, TIME_PER_TURN_EASY, TIME_PER_TURN_MIDDLE, TIME_PER_TURN_HARD} from "../../config"

class StartQuiz extends Component {
    handleChange = (value) => {
        this.setState({ selectedValue: value });
        this.props.currButton(value)
    }
    getSource = (lvl) => {
        let arr = []
        let oneRec = {}
        for (let i = 0; i < allCapitals; i++) {
            if ( data.level[i] <= lvl) {
                oneRec = {}
                //console.log(i)
                //console.log(oneRec)
                //console.log(data.capitalsNames[i])
                //console.log(data.countriesNames[i])
                oneRec.capitalName = data.capitalsNames[i]
                oneRec.countryName = data.countriesNames[i]
                //console.log(oneRec)
                arr.push(oneRec) 
                //console.log(arr)
            }
        }
        console.log(arr)
    }
    render() {
        const {radioButtonSelected} = this.props.location.state
        this.getSource(0)

        return (
            <div>
            <h3 className="text-left">Please choose your level:</h3>
            <br/>
            <RadioGroup className="text-left"
                name="fruit"
                selectedValue = "0"
                onChange={this.handleChange}>
                <label>
                    <Radio value="0" />EASY: 65 capitals and {TIME_PER_TURN_EASY} seconds per turn
                </label>
                <label>
                    <Radio value="1" />MIDDLE: 130 capitals and {TIME_PER_TURN_MIDDLE} seconds per turn
                </label>
                <label>
                    <Radio value="2" />HARD: {allCapitals} capitals and {TIME_PER_TURN_HARD} seconds per turn
                </label>
            </RadioGroup>
            </div>
        )
    }
}


export default StartQuiz

