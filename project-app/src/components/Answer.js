import React from 'react';

const Answer = ({ answer }) => {
    return (
        <div class="answer">
            <blockquote>"{answer.text}"</blockquote>
        </div>
    )
}

export default Answer;