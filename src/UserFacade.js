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
    const getAmountOfCustomersByCoach = (coachID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/amountofcustomers/"+coachID, options).then(r => r.json());
    }

    const getCustomerByCustomerID =  (customerID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/customer/"+customerID, options).then(r => r.json());
    }

    const getCoachByID =  (coachID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/coach/"+coachID, options).then(r => r.json());
    }

    const getNutritionByCustomerID =  (customerID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/nutrition/"+customerID, options).then(r => r.json());
    }

    const getMacroChartByCustomerID =  (customerID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/macrochart/"+customerID, options).then(r => r.json());
    }

    const getWeightChartByCustomerID =  (customerID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/weightchart/"+customerID, options).then(r => r.json());
    }

    const getLatestWeightByCustomerID =  (customerID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/latestweight/"+customerID, options).then(r => r.json());
    }


    const updateNutrition = (nutrition) => {
        const options = makeOptions("PUT", nutrition,true); //True add's the token
        return fetch(URL + "/api/user/updatenutrition/", options).then(r => r.json());
    }
    const updateWeight = (customerID,weight) => {
        const options = makeOptions("POST",false,true); //True add's the token
        return fetch(URL + "/api/user/updateweight/"+customerID+"/"+weight, options).then(r => r.json());
    }

    const setMealPlan = (mealPlan) => {
        const options = makeOptions("POST",mealPlan,true); //True add's the token
        return fetch(URL + "/api/user/mealplan", options).then(r => r.json());
    }
    const setWorkoutPlan = (workoutPlan) => {
        const options = makeOptions("POST",workoutPlan,true); //True add's the token
        return fetch(URL + "/api/user/workoutplan", options).then(r => r.json());
    }

    const getMealPlan = (customerID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/mealplan/"+customerID, options).then(r => r.json());
    }

    const getWorkoutPlan = (customerID) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + "/api/user/workoutplan/"+customerID, options).then(r => r.json());
    }

    const getActivities = (intensityLevel) =>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
                'X-RapidAPI-Key': '57c4cf4a3cmsha1733afccea0a99p1ca0ddjsnb9150d45bfe5'
            }
        };
        console.log("helllo")

        return fetch('https://fitness-calculator.p.rapidapi.com/activities?intensitylevel='+intensityLevel, options).then(r => r.json())
    }


    const getBurnedCalories = (customerID,activityID,activityMin) => {
        const options = makeOptions("GET",false,true); //True add's the token
        return  fetch(URL + `/api/user/caloriesburned/${customerID}/${activityID}/${activityMin}`, options).then(r => r.json());
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
        getMacroChartByCustomerID,
        getWeightChartByCustomerID,
        getLatestWeightByCustomerID,
        updateWeight,
        setMealPlan,
        setWorkoutPlan,
        getMealPlan,
        getWorkoutPlan,
        getActivities,
        getBurnedCalories,
        getCoachByID,
        getAmountOfCustomersByCoach,
    }
}

const facade = UserFacade();
export default facade;