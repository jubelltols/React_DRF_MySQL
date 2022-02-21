import React, { useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Navbar, Nav, Dropdown, Button, Row, Col, Container } from 'react-bootstrap'

import AuthContext from "../../context/AuthContext"
import { useAuth } from '../../hooks/useAuth'
import NotificationContext from "../../context/NotificationContext"

export default function Header () {
    const { user } = useContext(AuthContext)
    const { isLogged, logout, isAdmin } = useAuth()
    const { newNotification, setRefreshNotifications } = useContext(NotificationContext)

    useEffect(function () {
        setRefreshNotifications(true)
    }, [])

    console.log(isAdmin)

    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand><Link to="/" className="nav-link ms-2 px-2 text-white">ONBICI</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {isLogged 
                    ? 
                    user && (
                        isAdmin ? 
                        <Nav className="me-auto">
                            <Nav><Link to="/rent" className="nav-link ms-2 px-2 text-white">Rent</Link></Nav>
                            <Nav><Link to="/dashboard" className="nav-link ms-2 px-2 text-white">Dashboard</Link></Nav>
                            <Nav><Link to="/slot" className="nav-link ms-2 px-2 text-white">Slot</Link></Nav>
                            <Nav><Link to="/stations" className="nav-link ms-2 px-2 text-white">Stations</Link></Nav>
                            <Nav><Link to="/bikes" className="nav-link ms-2 px-2 text-white">Bike</Link></Nav>
                            <Nav><Link to="/incidences" className="nav-link ms-2 px-2 text-white">Incidences</Link></Nav>
                        </Nav>
                        : 
                        <Nav className="me-auto">
                            <Nav><Link to="/rent" className="nav-link ms-2 px-2 text-white">Rent</Link></Nav>
                        </Nav>
                    ):""}
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {isLogged 
                    ? 
                    user && (
                        <Row>
                            <Col className="d-flex justify-content-end">
                            <Dropdown drop="start">
                                <Dropdown.Toggle  className="btn btn-dark" id="dropdown-basic">
                                
                                {newNotification.length > 0 ?
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {newNotification.length}
                                    </span>
                                    : ""}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                    </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                {
                                    newNotification.length > 0 ?
                                    <>
                                        {newNotification.map(( not, index ) => (
                                            <Dropdown.Item>{not.title}</Dropdown.Item>
                                        ))}
                                        <Dropdown.Divider />
                                        <Dropdown.Item><Link className="dropdown-item" to="/notification">View notification</Link></Dropdown.Item>
                                    </>
                                    : <Dropdown.Item><Link className="dropdown-item" to="/notification">View notification</Link></Dropdown.Item>
                                }
                                </Dropdown.Menu>
                            </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown>
                                        <Dropdown.Toggle  className="d-flex flex-row align-items-center" variant="dark" id="dropdown-basic">
                                                <img src={user.image} alt="profileimage" width="35" height="35" className="rounded-circle bg-secondary"></img>
                                                <p className="align-middle ms-2 m-1">{user.username}</p>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item><Link className="dropdown-item" to="/profile">Profile</Link></Dropdown.Item>
                                            <Dropdown.Item><button className="dropdown-item"  onClick={logout}>Logout</button></Dropdown.Item>
                                        </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    )
                    : 
                    <div>
                        <Button variant="outline-light me-2"><Link to="/signin" className="text-decoration-none text-light">Sign In</Link></Button>
                        <Button variant="light"><Link to="/signup" className="text-decoration-none text-dark">Sign Up</Link></Button>
                    </div>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}