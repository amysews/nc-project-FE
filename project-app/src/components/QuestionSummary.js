import React from 'react';
import { Link } from 'react-router-dom';


const QuestionSummary = ({ question }) => {
    return (
        <li id="question-summary">
            <Link to={'/questions/' + question.id} >
                <blockquote>"{question.text}"</blockquote>
            </Link>
                { question.mp3_in_bucket ? <audio controls /> : null }
        </li>
    )
}

export default QuestionSummary;