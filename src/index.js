import { render } from "react-dom";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import App from "./App";
import Requests from "./components/Requests";
import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import Customers from "./components/Customers";
import Customer from "./components/Customer";
import HomeCustomer from "./components/HomeCustomer";
import apiFacade from "./apiFacade";
import MealPlan from "./components/MealPlan";
import "./style.css";

const rootElement = document.getElementById("root");
const loggedIn = apiFacade.loggedIn()

render(

    <BrowserRouter>
        <Routes>
            <Route exact="true" path="/" element={<App/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/requests" element={<Requests/>}/>
                <Route path="/createUser" element={<CreateUser/>}/>
                <Route path="/customers" element={<Customers/>}/>
                <Route path="/mealplan" element={<MealPlan/>}/>
                <Route path="customers/:customerID" element={<Customer />}/>

            </Route>
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />
        </Routes>
    </BrowserRouter>,
    rootElement
);