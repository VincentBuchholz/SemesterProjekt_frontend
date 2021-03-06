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
        <Container className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
            <h2 className={"text-center" }>Create client</h2>
            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <div ref={errorAlertMsg} className="alert alert-danger" style={{display:"none"}}>
                    <strong>Username is taken!</strong>
                </div>
                <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                    <strong>User has been created</strong>
                </div>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control required type="text" value={user.firstName}  placeholder="Firstname" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control required type="text" value={user.lastName}  placeholder="Lastname" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" value={user.email}  placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Nummer</Form.Label>
                    <Form.Control required type="text" value={user.phone}  placeholder="Phone number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" value={user.userName}  placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" value={user.password}  placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create client
                </Button>

            </Form>

        </Container>
    );
};

export default CreateUser;