import React, {useState, useEffect} from "react"
import facade from "./apiFacade";
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import {LinkContainer} from "react-router-bootstrap";
import FrontPage from "./components/FrontPage";
import {useNavigate} from 'react-router-dom';

function LogIn({login}) {
    const init = {username: "", password: ""};
    const [loginCredentials, setLoginCredentials] = useState(init);
    const performLogin = (evt) => {
        evt.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
    }
    const onChange = (evt) => {
        setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value})
    }

    return (
        <Container>
            <Form onChange={onChange} className={"mt-5 w-25 m-auto"}>
                <h2>Login</h2>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Username"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={performLogin}>
                    Login
                </Button>
            </Form>
        </Container>


    )

}



function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false)
    const [showLogin,setShowLogin] = useState(false)

    const logout = () => {
        facade.logout()
        setLoggedIn(false)
        navigate('/')
        setShowLogin(false);

    }
    const login = (user, pass) => {
        facade.login(user, pass)
            .then(res => setLoggedIn(true));
    }

    return (
        <div>
            {!showLogin &&
                <div>
                    <Navbar bg="light" expand="lg" className={"m-auto w-50"}>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto m-auto">
                                <LinkContainer to="/">
                                    <Nav.Link>Hjem</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/about">
                                    <Nav.Link>Om os</Nav.Link>
                                </LinkContainer>
                                <Button className="float-end" onClick={()=>setShowLogin(true)} >Log ind</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                <FrontPage/>
                </div>
            }
            {!loggedIn ? (showLogin && <LogIn login={login}/>) :
                (<div>
                    <Header logout={logout}/>
                </div>)}
        </div>
    )

}

export default App;