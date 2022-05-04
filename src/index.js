import { render } from "react-dom";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import App from "./App";
import Requests from "./components/Requests";
import Header from "./components/Header";
import Home from "./components/Home";
import CreateUser from "./components/CreateUser";


const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route exact="true" path="/" element={<App/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/requests" element={<Requests/>}/>
                <Route path="/createUser" element={<CreateUser/>}/>
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