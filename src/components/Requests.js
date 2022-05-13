import React from 'react';
import {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import requestFacade from "../RequestFacade";

const Requests = () => {
    const [requests, setRequests] = useState()
    const[requestSelected, setRequestSelected] = useState();

    useEffect(() => {
        requestFacade.getRequestByCoachID(localStorage.getItem("userID")).then(requests => setRequests(requests))
    }, [])

    const selectRequest = (e) => {
        const requestID = e.target.value;
        requestFacade.getRequestByRequestID(requestID).then(request =>{
            setRequestSelected(request);
        })
    }

    return (

        <Container>
            <Row>

            <Col>

            {
                requests &&

                <Table bordered hover className="mt-5">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Fornavn</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        requests.map((request) =>
                                    <tr key={request.id}>
                                        <td>{request.id}</td>
                                        <td>{request.firstName}</td>
                                        <td>{request.email}</td>
                                        <td><Button  type="button" value={request.id} onClick={selectRequest} className="btn-primary">Vis</Button></td>

                                    </tr>
                        )
                    }
                    </tbody>
                </Table>
            }
            </Col>
            <Col>
                {
                    requestSelected &&
                    <div className="mt-5">
                        <h3>Forespørgsels nr: {requestSelected.id}</h3>
                        <Form className="disabled">
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>Fornavn</Form.Label>
                                <Form.Control type="text" value={requestSelected.firstName}  placeholder="skriv dit fornavn" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Efternavn</Form.Label>
                                <Form.Control type="text" value={requestSelected.lastName}  placeholder="skriv dit efternavn" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={requestSelected.email}  placeholder="Skriv din email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Nummer</Form.Label>
                                <Form.Control type="text" value={requestSelected.phone}  placeholder="skriv dit nummer" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="desc">
                                <Form.Label>Kommentar</Form.Label>
                                <Form.Control as="textarea"  value={requestSelected.desc}  placeholder="" />
                            </Form.Group>
                        </Form>

                    </div>
                }


            </Col>
            </Row>
        </Container>);
};

export default Requests;