import React, {useEffect, useState} from 'react';

import facade from "../apiFacade";
import {Container} from "react-bootstrap";
import HomeCustomer from "./HomeCustomer";

const Home = () => {

    return (
        <Container>
            { localStorage.getItem("userType")=== "coach" &&
                <h1>hello coach</h1>
            }
            { localStorage.getItem("userType")=== "user" &&
                <HomeCustomer/>
            }

        </Container>
    );
};

export default Home;
