import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        const lvl_0 = stateLvl_0.map(item =>
            <h5 key={item[0]}>{item[1]} {item[2]} </h5>
        )

        const lvl_1 = stateLvl_1.map(item =>
            <h5 key={item[0]}>{item[1]}</h5>
        )

        const lvl_2 = stateLvl_2.map(item =>
            <h5 key={item[0]}>{item[1]}</h5>
        )


        return (
            <div>
                <Row>
                    <Col md={4}>
                        {lvl_0}
                    </Col>
                    <Col md={4}>
                        {lvl_1}
                    </Col>
                    <Col md={4}>
                        {lvl_2}
                    </Col>

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





