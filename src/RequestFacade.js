import React from 'react';
import requestFacade from "./RequestFacade";

const URL = "http://localhost:8080/ca2_war_exploded";

function RequestFacade() {
    const getCoaches = () => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "/api/request/coaches", options);
    }
    const createRequest = (request) => {
        const options = makeOptions("POST", request); //True add's the token
        fetch(URL + "/api/request/", options).then(r => r.json());
    }


    const makeOptions = (method, body) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    return {
        getCoaches,
        createRequest
    }
}

const facade = RequestFacade();
export default facade;