import * as data from '../../const/const_caps'
import { allCapitals } from "../../../config"

export const calcScore = (arr) => {
    let cnt = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].questionIndex === arr[i].answerIndex) {
            cnt++
        }
    }
    return cnt
}

export const countryNameToIndex = (cn) => {
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


