import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'

import SlotLine from './SlotLine'

export default function SlotTable ({ slot, deleteSlot, changeStatusSlot }) {

    return  (
        <div className='table-responsive d-flex' style={{backgroundColor: '#e8e8e8'}}>
        <Card className="shadow p-3 mb-5 bg-body rounded m-5">
            <Card.Body className='m-2'>
                <Row className='mb-2'>
                    <Col xs={9}  className="d-flex justify-content-start">
                        <Card.Title>Slots</Card.Title>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end">
                        <Link to="/slot/create" className="btn btn-dark">Create Slots</Link>
                    </Col>
                </Row>
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Modified At</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slot.map(( slot, index ) => (
                                <SlotLine key={index} slot={slot} deleteSlot={deleteSlot} changeStatusSlot={changeStatusSlot}/>
                            ))
                        }
                    </tbody>
                </table>
            </Card.Body>
        </Card>
        </div>
    )
}