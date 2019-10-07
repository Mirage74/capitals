import React, { Component } from 'react'
import { connect } from 'react-redux'
import { allCapitals, ALL_ANSWERS, DEBUG_MODE } from "../../config"
import * as data from '../const/const_caps'
import uuid from 'uuid'
import { getImageName } from "../../axfunc"
import { RadioGroup, Radio } from 'react-radio-group'
import { updUser } from '../../actions/auth/action'
import "../quiz.css"


class OneTask extends Component {

  state = {
    currSelectedValue: "-1",
    randArr: [],
    cardArr: []
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
      console.log("CountryName not found: ", cn)
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
    const { index, cpts, correctAnswer } = this.props
    let randInt
    let oneRec
    let newCpts = [...cpts]
    let randArr = []
    let cardArr = []
    newCpts.splice(index, 1)
    const mainCptRandIndex = Math.floor(Math.random() * Math.floor(ALL_ANSWERS))
    correctAnswer("" + mainCptRandIndex)
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
    cardArr = this.createCards(randArr)
    this.setState({ cardArr: cardArr })
  }

  
  async componentDidUpdate(prevProps) {
    if (this.props.index !== prevProps.index) {
      const { index, cpts, correctAnswer, user, updUser } = this.props
      let randInt
      let oneRec
      let newCpts = [...cpts]
      let randArr = []
      let cardArr = []
      newCpts.splice(index, 1)
      const mainCptRandIndex = Math.floor(Math.random() * Math.floor(ALL_ANSWERS))
      correctAnswer("" + mainCptRandIndex)
      for (let i = 0; i < ALL_ANSWERS - 1; i++) {
        randInt = Math.floor(Math.random() * Math.floor(newCpts.length))
        oneRec = newCpts[randInt]
        oneRec.index = this.countryNameToIndex(oneRec.countryName)
        randArr.push(oneRec)
        newCpts.splice(randInt, 1)
      }
      let dInfo
      if (DEBUG_MODE) {
        let dateFormat = require('dateformat')
        let now = new Date()
        let strTime = dateFormat(now, "isoDateTime")        
        dInfo = [...user.debuginfo]
        let oneTask = []
        let oneRecDebug = {}
        oneRecDebug.info = "before"
        oneRecDebug.strTime = strTime
        oneRecDebug.randInt = [...randArr]
        oneRecDebug.oneRec = oneRec
        oneRecDebug.cpts = [...cpts]
        oneRecDebug.newCpts = [...newCpts]
        //console.log("oneRecDebug", oneRecDebug)
        oneTask.push(oneRecDebug)
        //console.log("oneTask", oneTask)
        dInfo.push(oneTask)
        console.log("dInfo bef" , [...dInfo])
        //console.log("dInfo", dInfo)
        // let updatedUser = {
        //   displayName: user.displayName,
        //   debuginfo: dInfo
        // }
        // await updUser(updatedUser)
      }

      oneRec = cpts[index]
      oneRec.index = this.countryNameToIndex(oneRec.countryName)
      randArr.splice(mainCptRandIndex, 0, oneRec)
      this.setState({ randArr: randArr })

      if (DEBUG_MODE) {
        let dateFormat = require('dateformat')
        let now = new Date()
        let strTime = dateFormat(now, "isoDateTime")        
        //let dInfo = [...user.debuginfo]
        let oneTask = []
        let oneRecDebug = {}
        oneRecDebug.info = "after"
        oneRecDebug.strTime = strTime        
        oneRecDebug.randInt = [...randArr]
        oneRecDebug.oneRec = oneRec
        oneRecDebug.cpts = [...cpts]
        oneRecDebug.newCpts = [...newCpts]
        oneTask.push(oneRecDebug)
        dInfo.push(oneTask)
        console.log("dInfo aft", [...dInfo])
        let updatedUser = {
          displayName: user.displayName,
          debuginfo: dInfo
        }
        await updUser(updatedUser)
      }

      cardArr = this.createCards(randArr)
      this.setState({ cardArr: cardArr })
      this.setState({ currSelectedValue: -1 })
    }

  }

  handleChange = (value) => {
    this.setState({ currSelectedValue: value });
    this.props.currButton(value)
    this.props.indexSelected(this.state.randArr[parseInt(value)].index)
  }


  render() {
    const { index, cpts } = this.props
    const { currSelectedValue, randArr, cardArr } = this.state

    const task = (
      <div className="row">

        <h1 id="caps-question" className="w-100 p-2 topContainer" >Please choose the capital of {cpts[index].countryName}:</h1>

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
      <li id="capName-answer" key={uuid()}>
        {item}
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
  user: state.auth.currUser,  
  cpts: state.listCapitals.currCountriesList
})

export default connect(mapStateToProps, { updUser })(OneTask)

