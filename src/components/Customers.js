import React from 'react';
import {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import userFacade from "../UserFacade";
import {Link} from "react-router-dom";

const Requests = () => {
    const [customers, setCustomers] = useState()

    useEffect(() => {
        userFacade.getCustomersByCoach(localStorage.getItem("userID")).then(customers => setCustomers(customers))
    }, [])


    return (

        <Container>
            {
                customers &&

                <Table bordered hover className="mt-5">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Fornavn</th>
                        <th>Efternavn</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        customers.map((customer) =>
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.firstName}</td>
                                        <td>{customer.lastName}</td>
                                        <td>
                                            <Link
                                                style={{ display: "block", margin: "1rem 0" }}
                                                to={`/customers/${customer.id}`}
                                                key={customer.id}
                                            >
                                                Se kunde
                                            </Link>
                                        </td>

                                    </tr>
                        )
                    }
                    </tbody>
                </Table>
            }
        </Container>);
};

export default Requests;