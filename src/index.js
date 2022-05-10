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


const rootElement = document.getElementById("root");
const loggedIn = apiFacade.loggedIn()

const getUserType = () => {
    const userType  = apiFacade.getUserType();
    if(userType === "coach"){
        console.log("coach")
        return <Route path="/" element={<Home/>}/>
    }else{
        console.log("customer")
        return <Route path="/" element={<HomeCustomer/>}/>
    }
}
render(

    <BrowserRouter>
        <Routes>
            <Route exact="true" path="/" element={<App/>}>
                {loggedIn
                &&getUserType()
                }
                <Route path="/requests" element={<Requests/>}/>
                <Route path="/createUser" element={<CreateUser/>}/>
                <Route path="/customers" element={<Customers/>}/>
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