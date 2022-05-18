import React, {useEffect, useState} from 'react';

import facade from "../apiFacade";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import userFacade from "../UserFacade";
import apiFacade from "../apiFacade";
import RequestFacade from "../RequestFacade";

const Home = () => {

    function LoggedIn() {
        const initialState = {id: "", calories:"", protein: "", fat: "", carbs: ""};
        const initialStateURL = {url: ""};
        const [nutrition, setNutrition] = useState(initialState);
        const [macroChart, setMacroChart] = useState(initialStateURL);
        const [weightChart, setWeightChart] = useState(initialStateURL);
        const [weight,setWeight]=useState();
        const [currentWeight,setCurrentWeight] = useState();



        useEffect( ()  => {
            userFacade.getNutritionByCustomerID(apiFacade.getUserID()).then(nutrition => setNutrition(nutrition))
            userFacade.getMacroChartByCustomerID(apiFacade.getUserID()).then(macroChart => setMacroChart(macroChart))
            userFacade.getWeightChartByCustomerID(apiFacade.getUserID()).then(weightChart => setWeightChart(weightChart))
            userFacade.getLatestWeightByCustomerID(apiFacade.getUserID()).then(currentWeight => setCurrentWeight(currentWeight.weight))
            userFacade.getActivities(2).then(response => console.log(response))
        }, [])

        useEffect(() => {
        }, [])

        const handleInput = (event) => {
            const target = event.target
            const value = target.value
            setWeight(value)
        }


        const handleSubmit = async (e) => {
            e.preventDefault();
            await userFacade.updateWeight(localStorage.getItem("userID"),weight);
            setCurrentWeight(weight)
            setWeightChart(userFacade.getWeightChartByCustomerID(apiFacade.getUserID()).then(weightChart => setWeightChart(weightChart)))
        }

        return (
            <Container>
                <Row className="shadow-lg p-5 mb-5 bg-white rounded mt-5">

                    <Col>
                        <h3>Nutrition</h3>
                        <p>Calorie goal: {nutrition.calories} </p>
                        <br/>
                        <h5>Macros: </h5>
                        <p>Proteins: {nutrition.protein}g</p>
                        <p>Fat: {nutrition.fat}g</p>
                        <p>Carbs: {nutrition.carbs}g</p>
                        <img src={macroChart.url} alt="macrochart" style={{width:"80%"}}/>
                    </Col>
                    <Col>
                            <div className={"mb-5"}>
                                {currentWeight &&
                                    <div className={"mb-5"}>
                                        <h3>Current weight: {currentWeight} kg</h3>
                                <img src={weightChart.url} alt="weightgraph" style={{width: "100%"}}/>
                                    </div>
                                }
                            </div>
                        <div>
                            <Form onChange={handleInput} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label className={"h4"}>Weigh in</Form.Label>
                                <Form.Control type="number" required  value={weight}  placeholder="Weight in kg" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Insert weight
                            </Button>
                        </Form>
                        </div>


                    </Col>
                </Row>
            </Container>
        )

    }

    return (
        <Container>
            <LoggedIn />
        </Container>
    );
};

export default Home;
