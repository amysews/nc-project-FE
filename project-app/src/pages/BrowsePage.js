import React, { Component } from 'react';
import AddQuestionForm from '../components/AddQuestionForm';
import QuestionList from '../components/QuestionList';
import OnLoad from '../components/OnLoad';
import { fetchAllQuestions } from '../api';

class BrowsePage extends Component {
	state = {
		questions: [],
		loading: true
	}

	componentDidMount() {
		fetchAllQuestions()
			.then(questions => this.setState({ questions, loading: false }))
	}

	render() {
		const { questions, loading } = this.state;
		if (loading) return (
			<div className="loadingPage">
			<OnLoad />
			<p>Fetching questions...</p>
		</div>
		)
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