import "./Budget_Edit.css";
import { Container } from "react-bootstrap";
import { useState } from "react";


function getDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date();
    const stringMonth = months[today.getMonth()];
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    // return `${month}/${date}/${year}`;
    return `${stringMonth}`;
}

const Budget_Edit = () => {
    const [currentDate, setCurrentDate] = useState(getDate());
    return (
        <Container id="edit-budget-main-container">
            <div>
                <h2>Here you can edit your monthly Budget</h2>
                <p>Here is your current budget for <b><u>{currentDate}</u></b></p>
                {/* <p>{stringMonth}</p> */}
            </div>
        </Container>
    )
}


export default Budget_Edit



// calender reference - https://www.npmjs.com/package/react-calendar