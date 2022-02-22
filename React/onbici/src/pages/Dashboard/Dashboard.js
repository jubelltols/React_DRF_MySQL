import React from "react";
import { Card, Container, Row, Col, Table } from 'react-bootstrap';

import BarChart from "../../components/Dashboard/BarChart";
import PieChart from "../../components/Dashboard/PieChart";
import { useDashboard } from '../../hooks/useDashboard';
import SpinnerLoading from "../../components/Spinner/SpinnerLoading";

export default function Home() {
    const { data } = useDashboard()
    
    return (
        data.length === 0 ? <SpinnerLoading />
        : 
        <div style={{backgroundColor: '#e8e8e8'}}>
            <Container className="p-5 w-100"  style={{backgroundColor: '#e8e8e8'}}>
                <Row>
                    <Col className="me-1">
                        <Row>
                            <Card className="p-2 shadow bg-body rounded">
                                <Card.Body>
                                    <h4>Most used station starting a rental:</h4>
                                    <p>{ data.stations[0].start_station }</p>
                                </Card.Body>
                            </Card>
                        </Row>
                        <Row className="mt-3">
                            <Card className="p-2 shadow bg-body rounded">
                                <Card.Body> 
                                    <h4>Most used station ending a rental:</h4>
                                    <p>{ data.stations[0].end_station }</p>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Col>
                    <Col xs={8}>
                        <Card className="shadow bg-body rounded pt-2 pb-3">
                            <Card.Body>
                                <BarChart chartData={data.chart} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs={4}>
                        <Container className="p-3 shadow bg-body rounde">
                            <Card.Title className="text-center">Free slot, Free bikes and Unavailable slot</Card.Title>
                            <PieChart chartData={data.slots[0]} />
                        </Container>
                    </Col>
                    <Col xs={8} className="p-3 shadow bg-body rounde">
                        <Card.Title className="text-center">Last 10 bike rentals</Card.Title>
                            <Table responsive="md" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Id user</th>
                                    <th>Id bike</th>
                                    <th>Start Slot</th>
                                    <th>End Slot</th>
                                    <th>Created At</th>
                                    <th>Modified At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.lasts_rents.map(( data, index ) => (
                                    <tr key={index}>
                                        <td>{ data.id }</td>
                                        <td>{ data.user_id }</td>
                                        <td>{ data.bike_id }</td>
                                        <td>{ data.start_slot_id }</td>
                                        <td>{ data.end_slot_id }</td>
                                        <td>{new Date(data.created_at).toLocaleString()}</td>
                                        <td>{new Date(data.modified_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}