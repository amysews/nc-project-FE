import React, { Component } from 'react';
import QuestionFull from '../components/QuestionFull';
import AnswerList from '../components/AnswerList';
import { fetchOneQuestionAndAnswers } from '../api';

class QA_Page extends Component {
	state = {
        question: {},
        answers: []
	}

	componentDidMount() {
        fetchOneQuestionAndAnswers(this.props.match.params.question_id)
            .then(({ question, answers }) => this.setState({ question: question, answers: answers }))
	}

	render() {
		const { question, answers } = this.state;
		return (
            <div>
                <h1>Question:</h1>
                <QuestionFull question={question} />
                <h1>Answers:</h1>
                <AnswerList answers={answers} />
            </div>

		)
	}
}

export default QA_Page;