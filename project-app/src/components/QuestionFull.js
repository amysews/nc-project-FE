import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
// import { fetchAudioSrc } from '../api';

const QuestionFull = ({ question }) => {
    
    if (question.user) {
        // if (question.mp3_in_bucket) {
        //     const audioSrc = fetchAudioSrc(question.id);
        // }
    return (
        <div id="question-full">
            {/* <h1>Question:</h1> */}

            <blockquote>"{question.text}"</blockquote>
            { question.mp3_in_bucket ? <audio src={`https://s3.us-east-2.amazonaws.com/mp3audiostorage-northcoders/q${question.id}.mp3`} controls /> : null }
            <p className="subtitle">Submitted by {question.user.first_name} {question.user.surname} at {moment(question.time_stamp).format('h:mm:ss a dddd Do MMMM YYYY')}</p>
        </div>
    ) } else return <div></div>;
}

export default QuestionFull;