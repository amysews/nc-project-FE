import React from 'react';
import Answer from './Answer';

const AnswerList = ({ answers }) => {
    return (
        <div>
            <ul>
                {answers.map((answer, i) => {
                    return <Answer answer={answer} key={i} />
                })}
            </ul>
        </div>
    )
}

export default AnswerList;