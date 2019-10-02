import React, { Component } from 'react'
import { RadioGroup, Radio } from 'react-radio-group'
import { allCapitals, TIME_PER_TURN_EASY, TIME_PER_TURN_MIDDLE, TIME_PER_TURN_HARD, ALL_TASKS_EASY, ALL_TASKS_MIDDLE, ALL_TASKS_HARD } from "../../config"

class ChooseLevel extends Component {
    _isMounted = false
    state = {
        currSelectedValue: "-1"
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleChange = (value) => {
        if (this._isMounted) {
            this.setState({ currSelectedValue: value });
            this.props.currButton(value)
        }
    }
    render() {
        const { currSelectedValue } = this.state
        return (
            <div>
                <h3 className="text-left">Please choose your level:</h3>
                <br />
                <RadioGroup className="text-left"
                    name="level"
                    selectedValue={currSelectedValue}
                    onChange={this.handleChange}>
                    <label>
                        <Radio value="0" />EASY: 65 capitals and {TIME_PER_TURN_EASY} seconds per turn, {ALL_TASKS_EASY} tasks
                </label>
                    <label>
                        <Radio value="1" />MIDDLE: 130 capitals and {TIME_PER_TURN_MIDDLE} seconds per turn, {ALL_TASKS_MIDDLE} tasks
                </label>
                    <label>
                        <Radio value="2" />HARD: {allCapitals} capitals and {TIME_PER_TURN_HARD} seconds per turn, {ALL_TASKS_HARD} tasks
                </label>
                </RadioGroup>
            </div>
        )
    }
}


export default ChooseLevel
