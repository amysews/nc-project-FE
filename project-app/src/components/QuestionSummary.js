import React from 'react';
import { Link } from 'react-router-dom';


const QuestionSummary = ({ question }) => {
    return (
        <li id="question-summary">
            <Link to={'/questions/' + question.id} >
                <blockquote>"{question.text}"</blockquote>
            </Link>
            { question.mp3_in_bucket ? <audio src={`https://s3.us-east-2.amazonaws.com/mp3audiostorage-northcoders/q${question.id}.mp3`} controls /> : <p>No audio file available</p> }
        </li>
    )
}

export default QuestionSummary;