import React from 'react';
import QuestionSummary from './QuestionSummary';

const QuestionList = ({ questions }) => {
    return (
        <div>
            <h4>Browse all questions</h4>
            <ul>
                {questions.map((question, i) => {
                    return <QuestionSummary question={question} key={i} />
                })}
            </ul>
        </div>
    )
}

export default QuestionList;