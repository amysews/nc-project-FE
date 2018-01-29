import React from 'react';

const QuestionSummary = ({ question }) => {
    return (
        <li>
            <h5>{question.text}</h5>
        </li>
    )
}

export default QuestionSummary;