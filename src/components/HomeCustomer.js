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
                <Row className={"mt-5"}>
                    <Col>
                        <h2>Ernæring</h2>
                        <h4>Kalorie mål: {nutrition.calories} </h4>
                        <br />

                        <h4>Macros: </h4>
                        <h5>Proteiner: {nutrition.protein}</h5>
                        <h5>Fedt: {nutrition.fat}</h5>
                        <h5>kulhydrater: {nutrition.carbs}</h5>
                        <img src={macroChart.url} alt="macrochart" style={{width:"80%"}}/>
                    </Col>
                    <Col>
                            <div className={"mb-5"}>
                                {currentWeight &&
                                    <div className={"mb-5"}>
                                        <h3>Nuværende vægt: {currentWeight} kg</h3>
                                <img src={weightChart.url} alt="weightgraph" style={{width: "100%"}}/>
                                    </div>
                                }
                            </div>
                        <div>
                            <Form onChange={handleInput} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label className={"h4"}>Indvejning</Form.Label>
                                <Form.Control type="number" required  value={weight}  placeholder="Vægt i kg" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Indsæt vægt
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
