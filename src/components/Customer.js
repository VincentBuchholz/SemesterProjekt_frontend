import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import userFacade from "../UserFacade";
import apiFacade from "../apiFacade";



const Customer = () => {
    const parms = useParams();
    const successAlertMsg = useRef(null);
    const successAlertPlans = useRef(null);
    const errorAlertMsg = useRef(null);
    //{parms.customerID}

    const initialState = {id: "", calories:"", protein: "", fat: "", carbs: ""};
    const [nutrition, setNutrition] = useState(initialState);
    const [customer,setCustomer] = useState();
    const [weightChart, setWeightChart] = useState();
    const [currentWeight,setCurrentWeight] = useState();
    const [mealPlan,setMealplan] = useState({userID:parms.customerID,fileName:""});
    const [workoutPlan,setWorkoutPlan] = useState({userID:parms.customerID,fileName:""});
    const [error,setError] = useState();


    useEffect( ()  => {
        userFacade.getCustomerByCustomerID(parms.customerID).then(customer => setCustomer(customer));
        userFacade.getNutritionByCustomerID(parms.customerID).then(nutrition => setNutrition(nutrition))
        userFacade.getWeightChartByCustomerID(parms.customerID).then(weightChart => setWeightChart(weightChart.url))
        userFacade.getLatestWeightByCustomerID(parms.customerID).then(currentWeight => setCurrentWeight(currentWeight.weight))

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

    const handleInputMealPlan = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value;
        setMealplan({...mealPlan,[id]:value});
        console.log(mealPlan)
    }

    const handleSubmitMealPlan = (e) => {
        e.preventDefault();
        userFacade.setMealPlan(mealPlan).then(err =>{

            if(err.message){
                setError(err.message)
                errorAlertMsg.current.style.display = 'block';
                setTimeout(function() {errorAlertMsg.current.style.display = 'none'},3000)
            } else{
                successAlertPlans.current.style.display = 'block';
                setTimeout(function() {successAlertPlans.current.style.display = 'none'},3000)
            }

        });
    }

    const handleInputWorkoutPlan = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value;
        setWorkoutPlan({...workoutPlan,[id]:value});
        console.log(workoutPlan)
    }

    const handleSubmitWorkoutPlan = (e) => {
        e.preventDefault();
        userFacade.setWorkoutPlan(workoutPlan).then(err =>{

         if(err.message){
             setError(err.message)
             console.log(error)
             errorAlertMsg.current.style.display = 'block';
             setTimeout(function() {errorAlertMsg.current.style.display = 'none'},3000)
        } else{
             successAlertPlans.current.style.display = 'block';
             setTimeout(function() {successAlertPlans.current.style.display = 'none'},3000)
         }

        })
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div className="shadow p-3 mb-5 bg-white rounded mt-5">
                        <h3 className="text-center">Personal information</h3>
                        {customer &&
                            <Form className="disabled">
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control required type="text" value={customer.firstName}
                                                  />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control required type="text" value={customer.lastName}
                                                 />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required type="email" value={customer.email} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control required type="text" value={customer.phone} />
                                </Form.Group>
                            </Form>

                        }
                    </div>


                    <div className="shadow p-3 mb-5 bg-white rounded mt-5">
                        <h3 className="text-center">Nutrition information</h3>
                        {
                            customer &&
                            <Form onChange={handleInput} onSubmit={handleSubmit}>
                                <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                                    <strong>Updated</strong>
                                </div>
                                <Form.Group className="mb-3" controlId="calories">
                                    <Form.Label>Calories</Form.Label>
                                    <Form.Control required type="number" value={nutrition.calories}
                                                  placeholder="calories"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="protein">
                                    <Form.Label>Protein</Form.Label>
                                    <Form.Control required type="number" value={nutrition.protein}
                                                  placeholder="protein"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="fat">
                                    <Form.Label>Fat</Form.Label>
                                    <Form.Control required type="number" value={nutrition.fat} placeholder="fat"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="carbs">
                                    <Form.Label>Carbs</Form.Label>
                                    <Form.Control required type="number" value={nutrition.carbs}
                                                  placeholder="carbs"/>
                                </Form.Group>
                                <Button type="submit" className="btn-primary "> Update</Button>
                            </Form>
                        }
                    </div>


                </Col>

                <Col>
                    <div className="shadow p-3 mb-5 bg-white rounded mt-5">
                        {currentWeight &&
                        <div>
                            <div>
                                <h3 className={"text-center"}>Current weight: {currentWeight} kg</h3>
                            </div>
                        <img src={weightChart} alt="weightgraph" style={{width:"100%"}}/>
                        </div>
                        }
                    </div>

                    <div className="shadow p-3 mb-5 bg-white rounded mt-5">
                        <div ref={errorAlertMsg} className="alert alert-danger" style={{display:"none"}}>
                            <strong>{error}</strong>
                        </div>
                        <div ref={successAlertPlans} className="alert alert-success" style={{display:"none"}}>
                            <strong>Plan updated</strong>
                        </div>
                        <h3 className="text-center">Plans</h3>
                        <Form onChange={handleInputMealPlan} onSubmit={handleSubmitMealPlan} className="mb-5">
                            <Form.Group className="mb-3" controlId="fileName">
                                <Form.Label>Mealplan</Form.Label>
                                <Form.Control required type="text" value={mealPlan.fileName}
                                              placeholder="Insert link"/>
                            </Form.Group>
                            <Button type="submit" className="btn-primary ">Update</Button>
                        </Form>

                        <Form onChange={handleInputWorkoutPlan} onSubmit={handleSubmitWorkoutPlan}>
                            <Form.Group className="mb-3" controlId="fileName">
                                <Form.Label>Workoutplan</Form.Label>
                                <Form.Control required type="text" value={workoutPlan.fileName}
                                              placeholder="Insert link"/>
                            </Form.Group>
                            <Button type="submit" className="btn-primary ">Update</Button>
                        </Form>
                    </div>


                </Col>

            </Row>

        </Container>
    );
};

export default Customer;