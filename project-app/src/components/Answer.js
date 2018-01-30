import React from 'react';
import moment from 'moment';

const Answer = ({ answer }) => {
    return (
        <div className="answer">
            <blockquote>"{answer.text}"</blockquote>
            { answer.mp3_in_bucket ? <audio controls /> : null }
            <p className="subtitle">Submitted by {answer.user.first_name} {answer.user.surname} at {moment(answer.time_stamp).format('h:mm:ss a dddd Do MMMM YYYY')}</p>
        </div>
    )
}

export default Answer;