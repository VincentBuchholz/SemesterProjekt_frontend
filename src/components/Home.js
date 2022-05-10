import React, {useEffect, useState} from 'react';

import facade from "../apiFacade";
import {Container} from "react-bootstrap";
import HomeCustomer from "./HomeCustomer";

const Home = () => {

    function LoggedIn() {
        const [dataFromServer, setDataFromServer] = useState("Loading...")

        useEffect(() => {
        }, [])

        return (
            <div>
                <h2>Fit Helper</h2>
                <h5>Hello "User name"</h5>
            </div>
        )

    }

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
