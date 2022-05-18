import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import RequestFacade from "../RequestFacade";
import logo from "images/logo_v2.png"

const FrontPage = () => {
    const initialState = {coachID: "", firstName: "", lastName: "", email: "", desc: "", phone: ""};
    const [request, setRequest] = useState(initialState);

    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setRequest({...request, [id]: value})
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        RequestFacade.createRequest(request)
        setRequest(initialState);
    }

    const [coaches,setCoaches] = useState();

    useEffect(() => {
        RequestFacade.getCoaches()
            .then(res=>res.json())
            .then(coaches => setCoaches(coaches))
            .catch((error) =>{
                alert(error.status)
                console.log("error")
            })

    }, [setCoaches]);


    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                <Row>
                    <Col>
                        <h1>Fit Helper</h1>
                        <p>Fill out the contact form and get a non-committal offer!</p>

                    </Col>
                    <Col>
                        <img src={logo} alt={"logo"} className={"float-end"} width={"100px"}/>
                    </Col>
                </Row>
            </div>

            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Firstname</Form.Label>
                    <Form.Control type="text" required value={request.firstName}  placeholder="Type your firstname" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" required  value={request.lastName}  placeholder="Type your lastname" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required  value={request.email}  placeholder="Type your email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" required  value={request.phone}  placeholder="Type your phone number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="desc">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" required value={request.desc}  placeholder="You can make a comment" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="coachID">Select coach</Form.Label>
                    <Form.Select id="coachID">
                        <option value={""} selected disabled hidden>Select coach</option>

                        {coaches && coaches.map((coach) => {
                            return <option key={coach.id} value={coach.id}>{coach.firstName} {coach.lastName}</option>
                        }
                        )}

                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Send
                </Button>
            </Form>


        </Container>
    );
};

export default FrontPage;
