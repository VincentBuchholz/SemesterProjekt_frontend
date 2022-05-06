import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import userFacade from "../UserFacade";



const Customer = () => {
    const parms = useParams();
    const successAlertMsg = useRef(null);
    //{parms.customerID}

    const initialState = {id: "", calories:"", protein: "", fat: "", carbs: ""};
    const [nutrition, setNutrition] = useState(initialState);
    const [customer,setCustomer] = useState();

    useEffect( ()  => {
        userFacade.getCustomerByCustomerID(parms.customerID).then(customer => setCustomer(customer));
        userFacade.getNutritionByCustomerID(parms.customerID).then(nutrition => setNutrition(nutrition))
    }, [])



    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setNutrition({...nutrition, [id]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        userFacade.updateNutrition(nutrition);
        successAlertMsg.current.style.display = 'block';
        setTimeout(function() {successAlertMsg.current.style.display = 'none'},3000)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
                        <h3 className="text-center">Personlig information</h3>
                        {customer &&
                            <Form className="disabled">
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>Fornavn</Form.Label>
                                    <Form.Control required type="text" value={customer.firstName}
                                                  placeholder="Fornavn"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Efternavn</Form.Label>
                                    <Form.Control required type="text" value={customer.lastName}
                                                  placeholder="Efternavn"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control required type="email" value={customer.email} placeholder="Email"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Nummer</Form.Label>
                                    <Form.Control required type="text" value={customer.phone} placeholder="Tlf Nummer"/>
                                </Form.Group>
                            </Form>

                        }
                    </div>


                    <div className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
                        <h3 className="text-center">Ernærings information</h3>
                        {
                            customer &&
                            <Form onChange={handleInput} onSubmit={handleSubmit}>
                                <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                                    <strong>Information opdateret</strong>
                                </div>
                                <Form.Group className="mb-3" controlId="calories">
                                    <Form.Label>Kalorier</Form.Label>
                                    <Form.Control required type="number" value={nutrition.calories}
                                                  placeholder="calories"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="protein">
                                    <Form.Label>Protein</Form.Label>
                                    <Form.Control required type="number" value={nutrition.protein}
                                                  placeholder="protein"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="fat">
                                    <Form.Label>Fedt</Form.Label>
                                    <Form.Control required type="number" value={nutrition.fat} placeholder="fedt"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="carbs">
                                    <Form.Label>Kulhydrater</Form.Label>
                                    <Form.Control required type="number" value={nutrition.carbs}
                                                  placeholder="kulhydrater"/>
                                </Form.Group>
                                <Button type="submit" className="btn-primary "> Opdater</Button>
                            </Form>
                        }
                    </div>


                </Col>

                <Col>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
                    <img src="https://www.thewellnessendeavor.com/wp-content/uploads/2018/07/Day-100-Wt-Loss-Graph.png" alt="weight chart"/>
                    </div>
                </Col>

            </Row>

        </Container>
    );
};

export default Customer;