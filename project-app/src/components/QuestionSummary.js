import React from 'react';
import { Link } from 'react-router-dom';


const QuestionSummary = ({ question }) => {
    return (
        <li>
            <Link to={'/questions/' + question.id} ><h5>{question.text}</h5></Link>
        </li>
    )
}

export default QuestionSummary;