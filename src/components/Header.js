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


    return (
        <div>
            <Navbar expand="lg" style={{backgroundColor:"white !important" }} className={"m-auto w-50"}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto m-auto">
                            {
                                isCoach &&
                                <LinkContainer to="/">
                                    <Nav.Link>Home</Nav.Link>
                                </LinkContainer>
                            }
                            {
                                isCoach &&

                                <LinkContainer to="/Requests">
                                    <Nav.Link>Requests</Nav.Link>
                                </LinkContainer>

                            }
                            {
                                isCoach &&
                                <LinkContainer to="/createUser">
                                <Nav.Link>Create client</Nav.Link>
                                </LinkContainer>
                            }
                            {
                                isCoach &&
                                <LinkContainer to="/customers">
                                    <Nav.Link>Clients</Nav.Link>
                                </LinkContainer>
                            }


                            {
                                !isCoach &&

                                <LinkContainer to="/">
                                    <Nav.Link>Overview</Nav.Link>
                                </LinkContainer>

                            }
                            {
                                !isCoach &&

                                <LinkContainer to="/workoutplan">
                                    <Nav.Link>Workoutplan</Nav.Link>
                                </LinkContainer>

                            }
                            {
                                !isCoach &&

                                <LinkContainer to="/mealplan">
                                    <Nav.Link>Mealplan</Nav.Link>
                                </LinkContainer>

                            }
                            {
                                !isCoach &&

                                <LinkContainer to="/calories-burnt-calculator">
                                    <Nav.Link>Calories burned</Nav.Link>
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
