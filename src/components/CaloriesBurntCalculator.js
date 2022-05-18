import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";

import UserFacade from "../UserFacade";
import userFacade from "../UserFacade";
import RequestFacade from "../RequestFacade";

const CaloriesBurntCalculator = () => {
    const customerID = localStorage.getItem("userID");
    const initialState = {activityID:"", activityMin: ""};
    const [activityInfo, setActivityInfo] = useState(initialState);
    const [activities,setActivities] = useState();
    const [caloriesBurned, setCaloriesBurned] = useState();


    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setActivityInfo({...activityInfo, [id]: value})
    }

    const handleIntensity = async (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        console.log(value)
        await userFacade.getActivities(value).then(response => setActivities(response.data))
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        userFacade.getBurnedCalories(customerID,activityInfo.activityID,activityInfo.activityMin).then(response => setCaloriesBurned(response))
    }
    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <h3>Udregn dine forbrændte kalorier</h3>

            <Form onChange={handleIntensity}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="intensitylevel">Vælg intensitet</Form.Label>
                    <Form.Select id="intensitylevel">
                        <option value={""} selected disabled hidden>Vælg intensitet (1-5)</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>

                    </Form.Select>
                </Form.Group>
            </Form>
            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="activityID">Vælg aktivitet</Form.Label>
                    <Form.Select id="activityID">
                        <option value={""} selected disabled hidden>Vælg aktivitet</option>

                        {activities && activities.map((activity) => {
                                return <option key={activity._id} value={activity.id}>{activity.description}</option>
                            }
                        )}

                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="activityMin">
                    <Form.Label>Tid i minutter</Form.Label>
                    <Form.Control required type="number" value={activityInfo.activityMin}
                                  placeholder="minutter"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Udregn
                </Button>
                {caloriesBurned &&
                    <div className={"mt-3 mb-3"}><h3>{caloriesBurned.burnedCalorie} Kalorier</h3></div>
                }
            </Form>
        </Container>
    );
};

export default CaloriesBurntCalculator;
