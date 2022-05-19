import React, {useState, useEffect} from "react"
import facade from "./apiFacade";
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import {LinkContainer} from "react-router-bootstrap";
import FrontPage from "./components/FrontPage";
import {useNavigate} from 'react-router-dom';
import logo from "./images/logo_v2.png"

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
        <Container style={{height: "calc(75vh - 60px)"}}>
            <div className={"d-flex align-items-center justify-content-center h-100 "}>
            <Form onChange={onChange} onSubmit={performLogin} style={{width:"30%"}} className={"mt-5 shadow-lg p-5 mb-5 bg-white rounded"} >
                <div className="text-center">

                <img src={logo} alt={"logo"} width={"130px"}/>
                <h2>Login</h2>
                </div>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label >Email</Form.Label>
                    <Form.Control required type="text" placeholder="Username"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Login
                </Button>
            </Form>
            </div>
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
                    <Navbar expand="lg" style={{backgroundColor:"white !important" }} className={"m-auto w-50"}>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto m-auto">
                                <LinkContainer to="/">
                                    <Nav.Link>Home</Nav.Link>
                                </LinkContainer>
                                <Button className="float-end" onClick={()=>setShowLogin(true)} >Login</Button>
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