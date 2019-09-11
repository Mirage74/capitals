import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import * as data from '../const/const_caps'
import OneTask from "./oneTask"
import {allCapitals, TIME_PER_TURN_EASY, TIME_PER_TURN_MIDDLE, TIME_PER_TURN_HARD,  ALL_TASKS_EASY, ALL_TASKS_MIDDLE, ALL_TASKS_HARD} from "../../config"

class StartQuiz extends Component {
    state = {
        currTask: 0,
        timeForTurnInSec: 0,
        allTasks: 0,
        cpt: [],
        redirectLogin: false,
        redirectQuiz: false
    }

    
    getSource = (lvl) => {
        let arr = []
        let oneRec = {}
        for (let i = 0; i < allCapitals; i++) {
            if ( data.level[i] <= lvl) {
                oneRec = {}
                oneRec.capitalName = data.capitalsNames[i]
                oneRec.countryName = data.countriesNames[i]
                arr.push(oneRec) 
            }
        }
        return arr
    }

    cutCpt = (index) => {
        //this.setState({cpt: this.state.cpt.splice(index, 1)})
    }

    componentDidMount() {
        //console.log("startQ ")
        const {radioButtonSelected } = this.props.location.state
        const { displayName, cpts } = this.props
        this.setState({ displayName: displayName })    
        if (radioButtonSelected === 0) {
            this.setState({ timeForTurnInSec: TIME_PER_TURN_EASY })    
            this.setState({ allTasks: ALL_TASKS_EASY })    
        }
        if (radioButtonSelected === 1) {
            this.setState({ timeForTurnInSec: TIME_PER_TURN_MIDDLE })    
            this.setState({ allTasks: ALL_TASKS_MIDDLE })    
        }        
        if (radioButtonSelected === 2) {
            this.setState({ timeForTurnInSec: TIME_PER_TURN_HARD })    
            this.setState({ allTasks: ALL_TASKS_HARD })    
        }
        if ( cpts.length === 0 ) {
            this.setState({ redirectQuiz: true })    
        }       
      }

    
    render() {
        const { redirectQuiz} = this.state
        const { displayName, cpts } = this.props
        if (redirectQuiz || (displayName.length === 0)) {
            return <Redirect to={{
              pathname: 'Quiz',
              state: {
              }
            }}
            />
          }
        let forRender
        if (cpts.length > 0) {
           let currRand = Math.floor(Math.random() * Math.floor(cpts.length))
           
           forRender = (
               <div>
                   <div className="container">
                       <div className="row">
                           <div className="col">
                               <h1 className="text-center">Hello, {displayName} !</h1>
                               <OneTask index={currRand}/>
                           </div>
                       </div>
                   </div>
               </div>
           )
           this.cutCpt(currRand)
        }

        return (
            <div>
                <h1>{forRender}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    cpts: state.listCapitals.currCountriesList,
    displayName: state.auth.currDisplayName
  
  })
  
  
export default connect(mapStateToProps)(StartQuiz)
