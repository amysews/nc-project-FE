import React from 'react';
import moment from 'moment';

const QuestionFull = ({ question }) => {
    if (question.user) {
    return (
        <div id="question-full">
            <h1>Question:</h1>

            <blockquote>"{question.text}"</blockquote>
            { question.mp3_in_bucket ? <audio controls /> : null }
            <p class="subtitle">Submitted by {question.user.first_name} {question.user.surname} at {moment(question.time_stamp).format('h:mm:ss a dddd Do MMMM YYYY')}</p>
        </div>
    ) } else return <div></div>;
}

export default QuestionFull;