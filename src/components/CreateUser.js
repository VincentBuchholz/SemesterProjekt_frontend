import React, {useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import UserFacade from "../UserFacade";

const CreateUser = () => {
    const initialState = {userName: "", firstName: "", lastName: "", phone: "", email: "", password: "",coachID: localStorage.getItem("userID")};
    const [user, setUser] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState("Username is taken!");
    const errorAlertMsg = useRef(null);
    const successAlertMsg = useRef(null);
    var isError = false;


    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setUser({...user, [id]: value})
    }

    const createUser = (user) =>{
        UserFacade.createUser(user).then(err => {
            if(err.message){
                isError = true;
                setErrorMsg(err.message);
                handleErrorAndSuccess()
            }else{
                handleErrorAndSuccess()
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(user)
    }

    const handleErrorAndSuccess = () =>{
        if (isError){
            errorAlertMsg.current.style.display = 'block';
            setTimeout(function() {errorAlertMsg.current.style.display = 'none'},3000)
            isError = false;
        }else {
            setUser(initialState);
            successAlertMsg.current.style.display = 'block';
            setTimeout(function() {successAlertMsg.current.style.display = 'none'},3000)
        }
        setErrorMsg(null);
    }


    return (
        <Container>
            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <div ref={errorAlertMsg} className="alert alert-danger" style={{display:"none"}}>
                    <strong>Username is taken!</strong>
                </div>
                <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                    <strong>User has been created</strong>
                </div>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Fornavn</Form.Label>
                    <Form.Control required type="text" value={user.firstName}  placeholder="Fornavn" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Efternavn</Form.Label>
                    <Form.Control required type="text" value={user.lastName}  placeholder="Efternavn" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" value={user.email}  placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Nummer</Form.Label>
                    <Form.Control required type="text" value={user.phone}  placeholder="Tlf Nummer" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>Bruger navn</Form.Label>
                    <Form.Control required type="text" value={user.userName}  placeholder="Brugernavn" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Kodeord</Form.Label>
                    <Form.Control required type="password" value={user.password}  placeholder="Kodeord" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Opret bruger
                </Button>

            </Form>

        </Container>
    );
};

export default CreateUser;