import React, {useEffect, useState} from 'react';
import UserFacade from "../UserFacade";
import {Col, Row} from "react-bootstrap";
import userFacade from "../UserFacade";
import RequestFacade from "../RequestFacade";

const HomeCoach = () => {
    const[coach,setCoach] = useState();
    const[amountOfRequests, setAmountOfRequests] = useState();
    const[customers, setCustomers] = useState()



    useEffect(()=>{
        UserFacade.getCoachByID(localStorage.getItem("userID")).then(coach => setCoach(coach))
        userFacade.getAmountOfCustomersByCoach(localStorage.getItem("userID")).then(customers => setCustomers(customers))
        RequestFacade.getAmountOfRequestsByCoachID(localStorage.getItem("userID")).then(requests => setAmountOfRequests(requests))
    },[])
    return (
        <div>
            {coach &&
                <h1>Hey {coach.firstName}!</h1>

            }
            <Row>
                <Col>
                    <div className="shadow p-3 mb-5 bg-white rounded mt-5">
                        { customers &&
                            <h3>You have {customers.amount} client/s </h3>
                        }
                    </div>
                </Col>
                <Col>
                    <div className="shadow p-3 mb-5 bg-white rounded mt-5">
                        {
                            amountOfRequests &&
                            <h3>Amount of new requests: {amountOfRequests.amount}</h3>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HomeCoach;