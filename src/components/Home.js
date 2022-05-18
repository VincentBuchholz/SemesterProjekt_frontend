import React, {useEffect, useState} from 'react';

import facade from "../apiFacade";
import {Container} from "react-bootstrap";
import HomeCustomer from "./HomeCustomer";
import HomeCoach from "./HomeCoach";

const Home = () => {

    return (
        <Container>
            { localStorage.getItem("userType")=== "coach" &&
                <HomeCoach/>
            }
            { localStorage.getItem("userType")=== "user" &&
                <HomeCustomer/>
            }

        </Container>
    );
};

export default Home;
