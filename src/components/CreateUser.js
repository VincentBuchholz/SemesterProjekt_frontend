import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import UserFacade from "../UserFacade";

const CreateUser = () => {
    const initialState = {userName: "", firstName: "", lastName: "", phone: "", email: "", password: "",coachID: localStorage.getItem("userID")};
    const [user, setUser] = useState(initialState);

    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setUser({...user, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(user))
        UserFacade.createUser(user);
        setUser(initialState);
    }
    return (
        <Container>
            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Fornavn</Form.Label>
                    <Form.Control type="text" value={user.firstName}  placeholder="Fornavn" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Efternavn</Form.Label>
                    <Form.Control type="text" value={user.lastName}  placeholder="Efternavn" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={user.email}  placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Nummer</Form.Label>
                    <Form.Control type="text" value={user.phone}  placeholder="Tlf Nummer" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>Bruger navn</Form.Label>
                    <Form.Control type="text" value={user.userName}  placeholder="Brugernavn" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Kodeord</Form.Label>
                    <Form.Control type="password" value={user.password}  placeholder="Kodeord" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Opret bruger
                </Button>
            </Form>

        </Container>
    );
};

export default CreateUser;