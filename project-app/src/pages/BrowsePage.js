import React, { Component } from 'react';
import AddQuestionForm from '../components/AddQuestionForm';
import QuestionList from '../components/QuestionList';
import { fetchAllQuestions } from '../api';

class BrowsePage extends Component {
	state = {
		questions: []
	}

	componentDidMount() {
		fetchAllQuestions()
			.then(questions => this.setState({ questions }))
	}

	render() {
		const { questions } = this.state;
		return (
			<div className="container">
				{this.props.loggedInUser && this.props.loggedInUser.questioner ?<AddQuestionForm loggedInUser = {this.props.loggedInUser} /> :null}
				<h1>Browse all questions</h1>
				<QuestionList questions={questions} />
			</div>
		)
	}
}

export default BrowsePage;