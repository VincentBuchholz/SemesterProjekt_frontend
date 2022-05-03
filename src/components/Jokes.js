import React from 'react';import {useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";

const Jokes = () => {
    const [joke,setJoke] =useState();

    const getJoke = () =>{
        fetch("http://localhost:8080/ca2_war_exploded/api/jokes",{
            method: 'GET', // or 'PUT'
        })
            .then(res => res.json())
            .then(joke => setJoke(joke))
            .catch((error) =>{
                alert(error.status)
                console.log("error")
            })
    }


    return(

        <Container>
                <Button variant="primary" type="submit" onClick={getJoke}>
                    Get joke
                </Button>
                {
                    joke &&
                    <div>
                        <h4>Chuck norris joke:</h4>
                        <p>{joke.joke1}</p>
                        <a href={joke.joke1Reference} target="_blank">Source</a>
                        <br/>
                        <br/>
                        <h4>Dad joke:</h4>
                        <p>{joke.joke2}</p>
                        <a href={joke.joke2Reference} target="_blank">Source</a>
                    </div>
                }
        </Container>);
};

export default Jokes;