import React from 'react';
import QuestionSummary from './QuestionSummary';

const QuestionList = ({ questions }) => {
    return (
        <div id="question-list">
            <ul>
                {questions.map((question, i) => {
                    return <QuestionSummary question={question} key={i} />
                })}
            </ul>
        </div>
    )
}

export default QuestionList;