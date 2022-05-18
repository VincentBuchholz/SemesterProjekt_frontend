import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import RequestFacade from "../RequestFacade";
import {alignPropType} from "react-bootstrap/types";

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
            <h1>Fit Helper</h1>
            <p>Udfyld kontaktformularen og få et uforpligtende tilbud!</p>
            </div>

            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Fornavn</Form.Label>
                    <Form.Control type="text" required value={request.firstName}  placeholder="Skriv dit fornavn" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Efternavn</Form.Label>
                    <Form.Control type="text" required  value={request.lastName}  placeholder="Skriv dit efternavn" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" required  value={request.email}  placeholder="Skriv din email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Nummer</Form.Label>
                    <Form.Control type="text" required  value={request.phone}  placeholder="Skriv dit nummer" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="desc">
                    <Form.Label>Kommentar</Form.Label>
                    <Form.Control as="textarea" required value={request.desc}  placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="coachID">Vælg træner</Form.Label>
                    <Form.Select id="coachID">
                        <option value={""} selected disabled hidden>Vælg træner</option>

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
