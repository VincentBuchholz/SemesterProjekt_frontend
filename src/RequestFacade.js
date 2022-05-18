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

    const getRequestByCoachID = (coachID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/request/coach/"+coachID, options).then(r => r.json());
    }

    const getRequestByRequestID = (requestID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/request/"+requestID, options).then(r => r.json());
    }

    const deleteRequest = (requestID) => {
        const options = makeOptions("DELETE",false,true); //True add's the token
        fetch(URL + "/api/request/delete/"+requestID, options).then(r => r.json());
    }


    const makeOptions = (method, body,addToken) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken) {
            opts.headers["x-access-token"] = localStorage.getItem("jwtToken");
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    return {
        getCoaches,
        createRequest,
        getRequestByCoachID,
        getRequestByRequestID,
        deleteRequest,
    }
}

const facade = RequestFacade();
export default facade;