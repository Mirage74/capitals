import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const lvlNames = (
    <Col className="text-center" md={{ span: 5, offset: 1 }}>
        <Row >
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
    </Col>
)

export const headersTableFirstCountry = (
    <thead>
        <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>Country</th>
            <th>Capital</th>
            <th>Country</th>
            <th>Capital</th>
            <th>Country</th>
            <th>Capital</th>
            <th>Country</th>
            <th>Capital</th>                                                
        </tr>
    </thead>
)

export const headersTableFirstCapital = (
    <thead>
        <tr>
            <th>Capital</th>
            <th>Country</th>
            <th>Capital</th>
            <th>Country</th>
            <th>Capital</th>
            <th>Country</th>
            <th>Capital</th>
            <th>Country</th>
            <th>Capital</th>                                                
            <th>Country</th>            
        </tr>
    </thead>
)