import React from 'react';
import moment from 'moment';

const Answer = ({ answer }) => {
    return (
        <div className="answer">
            <blockquote>"{answer.text}"</blockquote>
            { answer.mp3_in_bucket ? <audio src={`https://s3.us-east-2.amazonaws.com/mp3audiostorage-northcoders/a${answer.id}.mp3`} controls /> : <p>No audio file available</p> }
            <p className="subtitle">Submitted by {answer.user.first_name} {answer.user.surname} at {moment(answer.time_stamp).format('h:mm:ss a dddd Do MMMM YYYY')}</p>
        </div>
    )
}

export default Answer;