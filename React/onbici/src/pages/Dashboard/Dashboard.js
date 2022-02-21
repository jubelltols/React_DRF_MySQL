import React from "react";
import { Card, Container, Row, Col, Table } from 'react-bootstrap';

import BarChart from "../../components/Dashboard/BarChart";
import PieChart from "../../components/Dashboard/PieChart";
import { useDashboard } from '../../hooks/useDashboard';
import SpinnerLoading from "../../components/Spinner/SpinnerLoading";

export default function Home() {
    const { data } = useDashboard()
    
    /* const data = {"chart":[{"day":14,"countRent":1},{"day":15,"countRent":3},{"day":16,"countRent":1},{"day":17,"countRent":3}],"stations":[{"start_station":"ESTACIO RENFE","end_station":"ESTACIO RENFE"}],"slots":[{"free_slot":4,"free_bike":1,"disable_slot":1}],"lasts_rents":[{"id":175,"user_id":1,"bike_id":88,"start_slot_id":6,"end_slot_id":8,"created_at":"2022-02-17T20:00:34.069129Z","modified_at":"2022-02-17T20:00:35.052433Z"},{"id":174,"user_id":1,"bike_id":88,"start_slot_id":5,"end_slot_id":6,"created_at":"2022-02-17T20:00:27.581384Z","modified_at":"2022-02-12T20:00:28.291384Z"},{"id":173,"user_id":1,"bike_id":88,"start_slot_id":8,"end_slot_id":5,"created_at":"2022-02-16T20:00:17.497946Z","modified_at":"2022-02-11T20:00:18.418203Z"},{"id":172,"user_id":1,"bike_id":88,"start_slot_id":5,"end_slot_id":8,"created_at":"2022-02-15T20:00:09.915653Z","modified_at":"2022-02-17T20:00:11.562146Z"},{"id":171,"user_id":1,"bike_id":88,"start_slot_id":6,"end_slot_id":5,"created_at":"2022-02-15T19:40:23.390764Z","modified_at":"2022-02-13T19:40:24.275937Z"},{"id":170,"user_id":1,"bike_id":88,"start_slot_id":8,"end_slot_id":6,"created_at":"2022-02-17T19:40:16.140678Z","modified_at":"2022-02-13T19:40:17.092624Z"},{"id":169,"user_id":1,"bike_id":88,"start_slot_id":6,"end_slot_id":8,"created_at":"2022-02-13T19:40:08.156310Z","modified_at":"2022-02-15T19:40:10.436826Z"},{"id":168,"user_id":1,"bike_id":88,"start_slot_id":5,"end_slot_id":6,"created_at":"2022-02-13T19:39:59.861494Z","modified_at":"2022-02-14T19:40:00.507856Z"},{"id":167,"user_id":1,"bike_id":88,"start_slot_id":6,"end_slot_id":5,"created_at":"2022-02-14T19:36:03.817584Z","modified_at":"2022-02-17T19:36:04.603991Z"},{"id":166,"user_id":1,"bike_id":88,"start_slot_id":5,"end_slot_id":6,"created_at":"2022-02-15T19:23:19.235793Z","modified_at":"2022-02-15T19:23:19.986270Z"}]}  */

    return (

        data.length === 0 ? <SpinnerLoading />
        : <Container className="mt-5">
        <Row className="m-3">
            <Col>
                <Row className="p-3">
                    <Card>
                        <Card.Body>
                            <h4>Most used station starting a rental:</h4>
                            <p>{ data.stations[0].start_station }</p>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="p-3">
                    <Card>
                        <Card.Body> 
                            <h4>Most used station ending a rental:</h4>
                            <p>{ data.stations[0].end_station }</p>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
            <Col xs={8}>
                <BarChart chartData={data.chart} />
            </Col>
        </Row>
        <Row className="m-3">
            <Col xs={4}>
                <PieChart chartData={data.slots[0]} />
            </Col>
            <Col xs={8}>
                <Table striped bordered hover>
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
                                <td>{ data.created_at }</td>
                                <td>{ data.modified_at }</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
        
    )
}