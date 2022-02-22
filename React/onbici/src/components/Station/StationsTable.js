import React from 'react'
import { Link } from 'react-router-dom'
import StationsLine from './StationsLine'
import { Card, Row, Col } from 'react-bootstrap'

export default function StationsTable ({ stations, deleteStation, changeStatusStation }) {

    return  (
        <div className='table-responsive' style={{backgroundColor: '#f2f2f2'}}>
        <Card className="shadow p-3 mb-5 bg-body rounded m-5 w-80">
            <Card.Body className='m-2'>
                <Row className='mb-2'>
                    <Col xs={9}  className="d-flex justify-content-start">
                        <Card.Title>Stations</Card.Title>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end">
                        <Link to="/station/create" className="btn btn-dark">Create Station</Link>
                    </Col>
                </Row>
                <table className="table table-responsive table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Modified At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stations.map(( station, index ) => (
                                <StationsLine key={index} station={station} deleteStation={deleteStation} changeStatusStation={changeStatusStation}/>
                            ))
                        }
                    </tbody>
                </table>
            </Card.Body>
        </Card>
        </div>
    )
}