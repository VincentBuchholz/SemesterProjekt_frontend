import React, {useState, useEffect} from "react"
import facade from "./apiFacade";
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Outlet} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";

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
    const [loggedIn, setLoggedIn] = useState(false)

    const logout = () => {
        facade.logout()
        setLoggedIn(false)
    }
    const login = (user, pass) => {
        facade.login(user, pass)
            .then(res => setLoggedIn(true));
    }

    return (
        <div>
            {!loggedIn ? (<LogIn login={login} />) :
                (<div>
                    <Header logout={logout}/>
                </div>)}
        </div>
    )

}

export default App;