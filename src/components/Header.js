import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

const Header = ({logout}) => {
    const userType = localStorage.getItem("userType");
    let isCoach = false;
    if(userType === "coach"){
        isCoach = true;
    }
    console.log(userType)
    console.log(isCoach)

    return (
        <div>
            <Navbar bg="light" expand="lg" className={"m-auto w-50"}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto m-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            {
                                isCoach &&

                                <LinkContainer to="/Requests">
                                    <Nav.Link>Forespørgsler</Nav.Link>
                                </LinkContainer>

                            }
                            {
                                isCoach &&
                                <LinkContainer to="/createUser">
                                <Nav.Link>Opret bruger</Nav.Link>
                                </LinkContainer>
                            }
                            {
                                isCoach &&
                                <LinkContainer to="/customers">
                                    <Nav.Link>Kunder</Nav.Link>
                                </LinkContainer>
                            }
                            <Button className="float-end" onClick={logout}>Log out</Button>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
            <Outlet/>
        </div>
    );
};

export default Header;
