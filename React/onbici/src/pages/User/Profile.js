import React from "react";
import { Nav, Tab, Row, Col, Container } from 'react-bootstrap';

import UpdateUser from "../../components/User/UpdateUser"
import ChangePassword from "../../components/User/ChangePassword"

export default function Home() {

    return (
        <Container fluid className="pt-5 pb-5"  style={{backgroundColor: '#e8e8e8'}}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Change password</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9} className="pb-5">
                        <Tab.Content>
                            <Tab.Pane eventKey="first" className="pb-5 me-5">
                                <UpdateUser/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second" className="pb-5 me-5">
                                <ChangePassword/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}