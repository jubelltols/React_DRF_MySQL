import React from "react";
import { Nav, Tab, Row, Col, Container } from 'react-bootstrap';

import UpdateUser from "../../components/User/UpdateUser"
import ChangePassword from "../../components/User/ChangePassword"

export default function Home() {

    return (
        <Container fluid className="mt-5">
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
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <UpdateUser/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <ChangePassword/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}