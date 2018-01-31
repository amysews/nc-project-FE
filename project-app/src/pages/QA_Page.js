import React, { Component } from 'react';
import QuestionFull from '../components/QuestionFull';
import AddAnswerForm from '../components/AddAnswerForm';
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
			<div className="container">
				<QuestionFull question={question} />
				{this.props.loggedInUser.answerer ? <AddAnswerForm questionId={question.id} loggedInUser = {this.props.loggedInUser}  /> :null }   
				<AnswerList answers={answers} />
			</div>
	// not working  
		)
	}
}

export default QA_Page;