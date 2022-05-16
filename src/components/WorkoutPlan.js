import React, {useEffect, useState} from 'react';
import userFacade from "../UserFacade";

import ExamplePDFViewer from "./PDFViewer";

const WorkoutPlan = () => {
    const customerID = localStorage.getItem("userID");
    const[fileName, setFileName] = useState("");

    useEffect(()=>{
        userFacade.getWorkoutPlan(customerID).then(workoutPlan => setFileName(workoutPlan.fileName))
    },[])

    return (
        <div>
            {fileName &&
                <ExamplePDFViewer fileName={fileName}/>
            }
        </div>
    );
};

export default WorkoutPlan;