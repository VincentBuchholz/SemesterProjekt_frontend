const URL = "http://localhost:8080/ca2_war_exploded";

function UserFacade() {

    const createUser = async (user) => {
        const options = makeOptions("POST", user,true); //True add's the token
        return await fetch(URL + "/api/user/", options).then(r => r.json());
    }

    const getCustomersByCoach = (coachID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/customers/"+coachID, options).then(r => r.json());
    }

    const getCustomerByCustomerID =  (customerID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/customer/"+customerID, options).then(r => r.json());
    }

    const getNutritionByCustomerID =  (customerID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/nutrition/"+customerID, options).then(r => r.json());
    }

    const updateNutrition = (nutrition) => {
        const options = makeOptions("PUT", nutrition,true); //True add's the token
        return fetch(URL + "/api/user/updatenutrition/", options).then(r => r.json());
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
        createUser,
        getCustomersByCoach,
        getCustomerByCustomerID,
        updateNutrition,
        getNutritionByCustomerID,
    }
}

const facade = UserFacade();
export default facade;