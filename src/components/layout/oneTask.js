import React, { Component } from 'react'
import {getArrayRandom} from "../../axfunc"
import {ALL_ANSWERS} from "../../config"
import * as data from '../const/const_caps';
import { connect } from 'react-redux'
import { cutCountriesList } from '../../actions/list-cpt/action'


class OneTask extends Component {
  render() {
    const {index, cpts} = this.props
    let newCpts = cpts.splice(index, 1)
    let randArr = getArrayRandom(ALL_ANSWERS, ALL_ANSWERS)
    // console.log("cpt", cpt)
     console.log("index", index)
    // console.log("randArr", randArr)
    // console.log("newCpt", newCpt)
    // console.log("data.countriesNames[index]", data.countriesNames[index])
    this.props.cutCountriesList(this.props.index)
    
    return (
      <div>

      </div>
    )

  }
}

const mapStateToProps = (state) => ({
    cpts : state.listCapitals.currCountriesList
})

export default connect(mapStateToProps, { cutCountriesList })(OneTask)



