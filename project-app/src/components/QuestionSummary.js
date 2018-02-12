import React from 'react';
import { Link } from 'react-router-dom';


const QuestionSummary = ({ question }) => {
    return (
        <Link to={'/questions/' + question.id} >
            <li id="question-summary">
                <blockquote>"{question.text}"</blockquote>
                {question.mp3_in_bucket ? <audio src={`https://s3.us-east-2.amazonaws.com/mp3audiostorage-northcoders/q${question.id}.mp3`} controls /> : null}
            </li>
        </Link>
    )
}

export default QuestionSummary;