import React from 'react';
import Answer from './Answer';

const AnswerList = ({ answers }) => {
    return (
        <div id="answer-list">
            <h1 className="headings">Answers:</h1>
            {answers.length ? 
            <ul>
                {answers.map((answer, i) => {
                    return <Answer answer={answer} key={i} />
                })}
            </ul>
            : "There have been no answers for this question yet"}
        </div>
    )
}

export default AnswerList;