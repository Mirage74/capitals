import React, { Component } from 'react'
import { allCapitals, ALL_ANSWERS } from "../../config"
import * as data from '../const/const_caps';
import { connect } from 'react-redux'
import uuid from 'uuid'
import Countdown from './stopwatch'
import { getImageName } from "../../axfunc"
import { RadioGroup, Radio } from 'react-radio-group'
import { cutCountriesList } from '../../actions/list-cpt/action'
import "../quiz.css"



class OneTask extends Component {

  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //         initialCps: []
  //     };
  // }

  state = {
    currSelectedValue: "-1",
    randArr: [],
    cardArr: [],
    confirmed: false
  }


  countryNameToIndex = (cn) => {
    let found = false
    let i = 0
    while (!found && (i < allCapitals)) {
      if (data.countriesNames[i] === cn) {
        found = true
        return i
      }
      i++
    }
    if (!found) {
      console.log("ISOtoIndex error")
    }
  }

  getOneCard = (countryName) => {
    return (
      <div>
        <img src={countryName} alt={countryName} width="150px" />
      </div>
    )
  }

  createCards = (randArr) => {
    let oneCard
    let cardArr = []
    for (let i = 0; i < randArr.length; i++) {
      oneCard = this.getOneCard(data[getImageName(randArr[i].index)])
      cardArr.push(oneCard)
    }
    return cardArr
  }

  componentDidMount() {
    const { index, cpts } = this.props
    let randInt
    let oneRec
    let newCpts = [...cpts]
    let randArr = []
    let cardArr = []
    newCpts.splice(index, 1)
    const mainCptRandIndex = Math.floor(Math.random() * Math.floor(ALL_ANSWERS))
    for (let i = 0; i < ALL_ANSWERS - 1; i++) {
      randInt = Math.floor(Math.random() * Math.floor(newCpts.length))
      oneRec = newCpts[randInt]
      oneRec.index = this.countryNameToIndex(oneRec.countryName)
      randArr.push(oneRec)
      newCpts.splice(randInt, 1)
    }
    oneRec = cpts[index]
    oneRec.index = this.countryNameToIndex(oneRec.countryName)
    randArr.splice(mainCptRandIndex, 0, oneRec)
    this.setState({ randArr: randArr })

    // console.log("index", index)
    // console.log("cpts", cpts)
    // console.log("randArr", randArr)

    cardArr = this.createCards(randArr)
    this.setState({ cardArr: cardArr })
  }

  handleChange = (value) => {
    this.setState({ currSelectedValue: value });
    this.props.currButton(value)
  }

  handleConfClick = e => {
    e.preventDefault()
    console.log("this.state.currSelectedValue: ", this.state.currSelectedValue)
  }


  render() {
    const { index, cpts, timeForTurnInSec } = this.props
    const { currSelectedValue, randArr, cardArr } = this.state
    // console.log("cpts render", cpts)
    // console.log("index render", index)
    // console.log("cpts[index].countryName", cpts[index].countryName)


    const buttonConf = (
      <input
        type="submit"
        value="Confirm"
        className="btn btn-primary"
        onClick={this.handleConfClick}
      />
    )
    
    const task = (
      <div className="row">
        
        <h1 id="caps-question" className="w-100 p-2 topContainer" >Please choose the capital of {cpts[index].countryName}: {'\u00A0'}  {buttonConf} </h1>

      </div>
    )

    const radioList = (
      <RadioGroup id="radio-answer" className="text-left"
        name="listAnswer"
        selectedValue={currSelectedValue}
        onChange={this.handleChange}>
        <label id="label-answer">
          <Radio value="0" />
        </label>
        <label id="label-answer">
          <Radio value="1" />
        </label>
        <label id="label-answer">
          <Radio value="2" />
        </label>
        <label id="label-answer">
          <Radio value="3" />
        </label>
        <label id="label-answer">
          <Radio value="4" />
        </label>
      </RadioGroup>
    )


    const cptNames = randArr.map(item =>
      <li id="capName-answer" className="text-center" key={uuid()}>
        <h5>{item.capitalName}</h5>
      </li>
    )

    const pics = cardArr.map(item =>
      <li id="capName-answer"  key={uuid()}>
        {item}
      </li>
    )


    return (
      <div className="row">
        <Countdown timeForTurnInSec={timeForTurnInSec}/>
        {task}
        {radioList}
        <ul className="w-100 p-2 topContainer">{cptNames}</ul>
        <ul className="w-100 p-2 topContainer">{pics}</ul>
      </div>
    )




  }
}

const mapStateToProps = (state) => ({
  cpts: state.listCapitals.currCountriesList
})

export default connect(mapStateToProps, { cutCountriesList })(OneTask)



