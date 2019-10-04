import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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

        const scoreName_0 = stateLvl_0.map(item =>
            <h5 key={item[0]}>{item[1]} </h5>
        )
        const scoreValue_0 = stateLvl_0.map(item =>
            <h5 key={uuid()}>{item[2]} </h5>
        )

        const scoreName_1 = stateLvl_1.map(item =>
            <h5 key={item[0]}>{item[1]} </h5>
        )
        const scoreValue_1 = stateLvl_1.map(item =>
            <h5 key={uuid()}>{item[2]} </h5>
        )

        const scoreName_2 = stateLvl_2.map(item =>
            <h5 key={item[0]}>{item[1]} </h5>
        )
        const scoreValue_2 = stateLvl_2.map(item =>
            <h5 key={uuid()}>{item[2]} </h5>
        )

        const userName = <h5 key={user._id}>{user.displayName} </h5>
        const userScore_0 = <h5 key={uuid()}>{user.bestScore[0]} </h5>
        const userScore_1 = <h5 key={uuid()}>{user.bestScore[1]} </h5>
        const userScore_2 = <h5 key={uuid()}>{user.bestScore[2]} </h5>


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

        const itemName = (name, os) => <Col md={{ span: 2, offset: os }} >{name}</Col>
        const itemScore = (sc) => <Col className="text-right" md={1}> {sc} </Col>



        return (
            <div>
                <Row>
                    <Col className="text-center" md={11}>
                        <h2>Your best score:</h2>
                    </Col>
                </Row>
                <br/>

                {lvlNames}
                <Row>
                    {itemName(userName, 0)}
                    {itemScore(userScore_0)}
                    {itemName(userName, 1)}
                    {itemScore(userScore_1)}
                    {itemName(userName, 1)}
                    {itemScore(userScore_2)}
                </Row>
                <br/>                
                <Row>
                    <Col className="text-center" md={11}>
                        <h2>TOP:</h2>
                    </Col>
                </Row>
                <br />

                {lvlNames}

                <Row>
                    {itemName(scoreName_0, 0)}
                    {itemScore(scoreValue_0)}
                    {itemName(scoreName_1, 1)}
                    {itemScore(scoreValue_1)}
                    {itemName(scoreName_2, 1)}
                    {itemScore(scoreValue_2)}
                </Row>


            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    user: state.auth.currUser,
    usersList: state.listCapitals.currUserList
})

export default connect(mapStateToProps)(ScoreList)





