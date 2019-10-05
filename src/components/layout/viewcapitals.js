import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import uuid from 'uuid'
import * as data from '../const/const_caps'
import { getImageName } from "../../axfunc"
import { headersTableFirstCountry, headersTableFirstCapital } from './viewax/axfview'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { allCapitals } from "../../config"
import { RadioGroup, Radio } from 'react-radio-group'

class ViewCapitals extends Component {
    state = {
        redirectQuiz: false,
        expended: false,
        currSelectedRadio: "0",
        sortByCountry_0_Capital_1: 0,
        arrMain: [],
        arrMainSorted: [],
        cardArr: []
    }

    handleBack = e => {
        e.preventDefault()
        this.setState({ redirectQuiz: true })
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
            oneCard = this.getOneCard(data[getImageName(randArr[i])])
            cardArr.push(oneCard)
        }
        return cardArr
    }

    onPlusMinusClick = e => {
        e.preventDefault()
        this.setState({ expended: !this.state.expended })

    }

    compareCountry(a, b) {
        if (a.countryName < b.countryName) {
            return -1
        }
        if (a.countryName > b.countryName) {
            return 1
        }
        return 0;
    }

    compareCapital(a, b) {
        if (a.capitalName < b.capitalName) {
            return -1
        }
        if (a.capitalName > b.capitalName) {
            return 1
        }
        return 0;
    }

    componentDidMount() {
        let arrTmp = []
        let oneRec
        for (let i = 0; i < allCapitals; i++) {
            oneRec = {}
            oneRec.index = i
            oneRec.countryName = data.countriesNames[i]
            oneRec.capitalName = data.capitalsNames[i]
            arrTmp.push(oneRec)
        }
        this.setState({ arrMain: arrTmp })
        let arrSorted = []
        if (this.state.sortByCountry_0_Capital_1 === 0) {
            arrSorted = [...arrTmp.sort(this.compareCountry)]
        } else {
            arrSorted = [...arrTmp.sort(this.compareCapital)]
        }
        this.setState({ arrMainSorted: arrSorted })

        let cptsIndexArr = []
        for (let i = 0; i < allCapitals; i++) {
            cptsIndexArr.push(arrSorted[i].index)
        }
        //console.log("cptsIndexArr", cptsIndexArr)
        const cardArr = this.createCards(cptsIndexArr)
        this.setState({ cardArr: cardArr })
    }

    handleChange = (value) => {
        console.log(value)
        this.setState({ sortByCountry_0_Capital_1: parseInt(value) })
        this.setState({ currSelectedRadio: value })
        let arrSorted = []
        if (parseInt(value) === 0) {
            arrSorted = [...this.state.arrMain.sort(this.compareCountry)]
        } else {
            arrSorted = [...this.state.arrMain.sort(this.compareCapital)]
        }
        this.setState({ arrMainSorted: arrSorted })
        
    }

    render() {
        const { redirectQuiz, arrMainSorted, cardArr, expended, sortByCountry_0_Capital_1, currSelectedRadio } = this.state
        //console.log("render arrMainSorted", arrMainSorted)
        //console.log("arrMainSorted", arrMainSorted)
        if (redirectQuiz) {
            return <Redirect to={{
                pathname: 'Quiz',
                state: {
                }
            }}
            />
        }

        let forRender
        if (arrMainSorted.length > 0) {
            if (!expended) {
                const rowsNum = Math.floor(allCapitals / 5)
                let arrRow = []
                let oneRow
                let tempArr
                for (let i = 0; i < rowsNum + 1; i++) {
                    tempArr = [...arrMainSorted]
                    tempArr = tempArr.splice(5 * i, 5)
                    if (sortByCountry_0_Capital_1 === 0) {
                        oneRow = tempArr.map(item =>
                            <React.Fragment key={item.index}>
                                <td>{item.countryName}</td>
                                <td>{item.capitalName}</td>
                            </React.Fragment>
                        )
                    } else {
                        oneRow = tempArr.map(item =>
                            <React.Fragment key={item.index}>
                                <td>{item.capitalName}</td>
                                <td>{item.countryName}</td>
                            </React.Fragment>
                        )
                    }
                    arrRow.push(oneRow)
                }

                const bodyMap = arrRow.map(item =>
                    <tr key={uuid()}>
                        {item}
                    </tr>
                )

                let dataTable = (
                    <tbody>
                        {bodyMap}
                    </tbody>
                )
                let hTable = headersTableFirstCountry
                if (sortByCountry_0_Capital_1 === 1) {
                    hTable = headersTableFirstCapital
                }
                forRender = (
                    <Col className="text-center" md={{ span: 10, offset: 1 }}>
                        <Table striped bordered hover size="sm">
                            {hTable}
                            {dataTable}
                        </Table>
                    </Col>
                )

            } else {
                const rowsNum = Math.floor(allCapitals / 3)
                let arrRow = []
                let oneRow
                let tempArr
                let tempCardArr
                for (let i = 0; i < rowsNum + 1; i++) {
                    tempArr = [...arrMainSorted]
                    tempArr = tempArr.splice(3 * i, 3)
                    tempCardArr = [...cardArr]
                    tempCardArr = tempCardArr.splice(3 * i, 3)
                    for (let i = 0; i < tempArr.length; i++) {
                        tempArr[i].card = tempCardArr[i]
                    }
                    //console.log("tempArr", tempArr)
                    if (sortByCountry_0_Capital_1 === 0) {
                        oneRow = tempArr.map(item =>
                            <React.Fragment key={item.index}>
                                <td>Country: <b>{item.countryName}</b> <br /> Capital: <b>{item.capitalName}</b></td>
                                <td>{item.card}</td>
                            </React.Fragment>
                        )
                    } else {
                        oneRow = tempArr.map(item =>
                            <React.Fragment key={item.index}>
                                <td>Capital: <b>{item.capitalName}</b> <br /> Country: <b>{item.countryName}</b></td>
                                <td>{item.card}</td>

                            </React.Fragment>
                        )
                    }
                    arrRow.push(oneRow)
                }

                const bodyMap = arrRow.map(item =>
                    <tr key={uuid()}>
                        {item}
                    </tr>
                )

                let dataTable = (
                    <tbody>
                        {bodyMap}
                    </tbody>
                )
                forRender = (
                    <Col className="text-center" md={{ span: 10, offset: 1 }}>
                        <Table striped bordered hover size="sm">
                            {dataTable}
                        </Table>
                    </Col>
                )
            }
        }
        let plusMinus
        if (!expended) {
            plusMinus = (
                <Col md={{ span: 1, offset: 1 }}>
                    <i className="fas fa-plus"
                        style={{ cursor: 'pointer', color: 'green' }}
                        onClick={this.onPlusMinusClick}
                    />
                </Col>
            )
        } else {
            plusMinus = (
                <Col md={{ span: 1, offset: 1 }}>
                    <i className="fas fa-minus"
                        style={{ cursor: 'pointer', color: 'green' }}
                        onClick={this.onPlusMinusClick}
                    />
                </Col>
            )
        }

        let chooseSort = (
                <RadioGroup className="text-left"
                    name="sort"
                    selectedValue= {currSelectedRadio}
                    onChange={this.handleChange}>
                     <Col>
                    <label>
                        <Radio value="0" />by <b>country </b>
                    </label>
                    </Col>
                    <Col>   
                    <label>
                        <Radio value="1" />by <b>capital</b>
                    </label>
                    </Col>   
                </RadioGroup>
            )


        return (
            <div>
                {chooseSort}
                <Button onClick={this.handleBack}>Back</Button> 
                {plusMinus}
                {forRender}
                <br />
                <Button onClick={this.handleBack}>Back</Button>
            </div>
        )

    }
}


export default ViewCapitals