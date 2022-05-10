import React, {useEffect, useState} from 'react';

import facade from "../apiFacade";
import {Container} from "react-bootstrap";

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
            <LoggedIn />
        </Container>
    );
};

export default Home;
