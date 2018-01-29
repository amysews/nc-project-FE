import React from 'react';

const QuestionFull = ({ question }) => {
    console.log(question)
    return (
        <div id="question-full">
            <h1>Question:</h1>

            <blockquote>"{question.text}"</blockquote>
            {/* <p>Submitted by {question.user.first_name} {question.user.surname} at {question.time_stamp}</p> */}
        </div>
    )
}

export default QuestionFull;