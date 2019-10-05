import React, { Component } from 'react'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

class ScoreList extends Component {
    state = {
        stateLvl_0: [],
        stateLvl_1: [],
        stateLvl_2: []
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
        if (tmpAr.length > 5) {
            tmpAr = tmpAr.slice(0, 5)
        }

        this.setState({ stateLvl_0: tmpAr })

        tmpAr = usersList[1].sort(this.compare)
        if (tmpAr.length > 5) {
            tmpAr = tmpAr.slice(0, 5)
        }
        this.setState({ stateLvl_1: tmpAr })

        tmpAr = usersList[2].sort(this.compare)
        if (tmpAr.length > 5) {
            tmpAr = tmpAr.slice(0, 5)
        }
        this.setState({ stateLvl_2: tmpAr })

    }

    render() {
        const { stateLvl_0, stateLvl_1, stateLvl_2 } = this.state
        const { user } = this.props

        let arrScore = []
        let oneRec = []
        let dataTable
        if (stateLvl_0[0] || stateLvl_1[0] || stateLvl_1[0] ) {
            for (let i = 0; i < 5; i++) {
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

                //oneRec = [stateLvl_0[i][1], stateLvl_0[i][2], stateLvl_1[i][1], stateLvl_1[i][2], stateLvl_2[i][1], stateLvl_2[i][2]]
                arrScore.push(oneRec)
            }

            let oneRow
            let arrRow = []
            for (let i = 0; i < 5; i++) {
                oneRow = (
                    <tr>
                        <td>{arrScore[i][0]}</td>
                        <td>{arrScore[i][1]}</td>
                        <td>{arrScore[i][2]}</td>
                        <td>{arrScore[i][3]}</td>
                        <td>{arrScore[i][4]}</td>
                        <td>{arrScore[i][5]}</td>
                    </tr>
                )
                arrRow.push(oneRow)
            }

            dataTable = (
                <tbody>
                    {arrRow[0]}
                    {arrRow[1]}
                    {arrRow[2]}
                    {arrRow[3]}
                    {arrRow[4]}
                </tbody>
            )

        }

        let tableHB = (
            <Table striped bordered hover size="sm">
                {dataTable}
            </Table>
        )



        let userScore = (
            <Table striped bordered hover size="sm">
                <tbody>
                    <tr>
                        <td><b>{user.displayName}</b></td>
                        <td>{user.bestScore[0]}</td>
                        <td><b>{user.displayName}</b></td>
                        <td>{user.bestScore[1]}</td>
                        <td><b>{user.displayName}</b></td>
                        <td>{user.bestScore[2]}</td>
                    </tr>
                </tbody>
            </Table>
        )


        const lvlNames = (
            <Row>
                <Col className="text-center" md={{ span: 1, offset: 1 }}>
                    <h4>Easy</h4>
                </Col>
                <Col className="text-center" md={{ span: 1, offset: 3 }}>
                    <h4>Middle</h4>
                </Col>
                <Col className="text-center" md={{ span: 1, offset: 3 }}>
                    <h4>Hard</h4>
                </Col>
            </Row>
        )


        return (
            <div>
                <Row>
                    <Col className="text-center" md={11}>
                        <h2>Your best score:</h2>
                    </Col>
                </Row>
                <br />

                {lvlNames}
                {userScore}
                <br />
                <Row>
                    <Col className="text-center" md={11}>
                        <h3>Top:</h3>
                    </Col>
                </Row>
                <br />

                {lvlNames}

                {tableHB}


            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    user: state.auth.currUser,
    usersList: state.listCapitals.currUserList
})

export default connect(mapStateToProps)(ScoreList)





