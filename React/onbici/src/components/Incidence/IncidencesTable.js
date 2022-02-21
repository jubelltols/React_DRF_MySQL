import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'

import IncidencesLine from './IncidencesLine'

export default function IncidencesTable ({ incidences, deleteIncidence, changeStatusIncidences }) {

    return  (
        <div className='table-responsive' style={{backgroundColor: '#e8e8e8'}}>
        <Card className="shadow p-3 mb-5 bg-body rounded m-5">
            <Card.Body className='m-2'>
                <Row className='mb-2'>
                    <Col xs={9}  className="d-flex justify-content-start">
                        <Card.Title>incidences</Card.Title>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end">
                        <Link to="/incidences/create/null" className="btn btn-dark">Create Incidences</Link>
                    </Col>
                </Row>
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Modified At</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            incidences.map(( incidence, index ) => (
                                <IncidencesLine key={index} incidence={incidence} deleteIncidence={deleteIncidence} changeStatusIncidences={changeStatusIncidences}/>
                            ))
                        }
                    </tbody>
                </table>
            </Card.Body>
        </Card>
        </div>
    )
}