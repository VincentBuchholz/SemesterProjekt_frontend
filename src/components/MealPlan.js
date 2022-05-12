import React, {useEffect, useState} from 'react';
import userFacade from "../UserFacade";
import PDFViewer from 'pdf-viewer-reactjs'
import ExamplePDFViewer from "./PDFViewer";

const MealPlan = () => {
    const customerID = localStorage.getItem("userID");
    const[fileName, setFileName] = useState("");

    useEffect(()=>{
        userFacade.getMealPlan(customerID).then(mealPlan => setFileName(mealPlan.fileName))

    },[])

    return (
        <div>
            {fileName &&
                <ExamplePDFViewer fileName={fileName}/>
            }
        </div>
    );
};

export default MealPlan;