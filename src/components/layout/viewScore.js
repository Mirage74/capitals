import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import {lvlNames} from './viewax/axfview'
import uuid from 'uuid'
//import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

class ViewScore extends Component {
    state = {
        stateLvl_0: [],
        stateLvl_1: [],
        stateLvl_2: [],
        redirectQuiz: false
    }

    handleBack = e => {
        e.preventDefault()
        this.setState({redirectQuiz: true})
    }    

    compare(a, b) {
        if (a[2] < b[2]) {
            return 1
        }
        if (a[2] > b[2]) {
            return -1
        }
        return 0;
    }

    componentDidMount() {
        const { usersList } = this.props
        let tmpAr

        tmpAr = usersList[0].sort(this.compare)

        this.setState({ stateLvl_0: tmpAr })

        tmpAr = usersList[1].sort(this.compare)
        this.setState({ stateLvl_1: tmpAr })

        tmpAr = usersList[2].sort(this.compare)
        this.setState({ stateLvl_2: tmpAr })

    }

    render() {
        const { stateLvl_0, stateLvl_1, stateLvl_2, redirectQuiz } = this.state

        if (redirectQuiz) {
            return <Redirect to={{
                pathname: 'Quiz',
                state: {
                }
            }}
            />
        }        

        let arrScore = []
        let oneRec = []
        let dataTable
        let maxLen = stateLvl_0.length
        if (stateLvl_1 > maxLen) {
            maxLen = stateLvl_1
        }
        if (stateLvl_2 > maxLen) {
            maxLen = stateLvl_2
        }

        if (stateLvl_0[0] || stateLvl_1[0] || stateLvl_1[0]) {
            for (let i = 0; i < maxLen; i++) {
                oneRec = []
                if (stateLvl_0[i]) {
                    oneRec.push(stateLvl_0[i][1])
                } else {
                    oneRec.push("")
                }
                if (stateLvl_0[i]) {
                    oneRec.push(stateLvl_0[i][2])
                } else {
                    oneRec.push("")
                }

                if (stateLvl_1[i]) {
                    oneRec.push(stateLvl_1[i][1])
                } else {
                    oneRec.push("")
                }
                if (stateLvl_1[i]) {
                    oneRec.push(stateLvl_1[i][2])
                } else {
                    oneRec.push("")
                }

                if (stateLvl_2[i]) {
                    oneRec.push(stateLvl_2[i][1])
                } else {
                    oneRec.push("")
                }
                if (stateLvl_2[i]) {
                    oneRec.push(stateLvl_2[i][2])
                } else {
                    oneRec.push("")
                }

                arrScore.push(oneRec)
            }

            let oneRow
            let arrRow = []

            for (let i = 0; i < maxLen; i++) {
                oneRow = (
                    <>
                        <td>{arrScore[i][0]}</td>
                        <td>{arrScore[i][1]}</td>
                        <td>{arrScore[i][2]}</td>
                        <td>{arrScore[i][3]}</td>
                        <td>{arrScore[i][4]}</td>
                        <td>{arrScore[i][5]}</td>
                    </>

                )
                arrRow.push(oneRow)
            }


            const bodyMap = arrRow.map(item =>
                <tr key={uuid()}>
                    {item}
                </tr>
            )


            dataTable = (
                <tbody>
                    {bodyMap}
                </tbody>
            )

        }

        let tableHB = (
            <Col className="text-center" md={{ span: 5, offset: 1 }}>
                <Table striped bordered hover size="sm">
                    {dataTable}
                </Table>
            </Col>
        )



        return (
            <div>
                {lvlNames}
                {tableHB}
                <br />
                <Button onClick={this.handleBack}>Back</Button>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    usersList: state.listCapitals.currUserList
})

export default connect(mapStateToProps)(ViewScore)





