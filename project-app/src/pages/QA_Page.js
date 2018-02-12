import React, { Component } from 'react';
import QuestionFull from '../components/QuestionFull';
import AddAnswerForm from '../components/AddAnswerForm';
import AnswerList from '../components/AnswerList';
import OnLoad from '../components/OnLoad';
import { fetchOneQuestionAndAnswers, fetchOneAnswer } from '../api';

class QA_Page extends Component {
	state = {
		question: {},
		answers: [],
		timer: null,
		counter: 0,
		receivedAnswer: false,
		loading: true
	}

	componentDidMount() {
		fetchOneQuestionAndAnswers(this.props.match.params.question_id)
			.then(({ question, answers }) => this.setState({ question: question, answers: answers, loading: false }))
	}

	// function that gets passed to AddAnswerForm which then has access to answerId (where the new answer has been inserted) this changes state inside QA_Page - updating answers, which then forces a re-render of AnswerList
	checkTextInBucket = (id) => {
		let timer = setInterval(() => this.queryRDS(id), 2000)
		this.setState({ timer })
	}

	queryRDS = (id) => {
		// api function call here asking for data of an answer with given id
		return fetchOneAnswer(id)
			.then(answer => {
				// check if the flag of this answer - text_in_bucket is true
				// if true - add this new answer to the end of the answers array in the state of QA_Page
				if (answer.text_in_bucket && !this.state.receivedAnswer) {
					clearInterval(this.state.timer)
					const newAnswers = [...this.state.answers, answer];
					this.setState({ answers: newAnswers, receivedAnswer: true })
				} else {
					if (this.state.counter > 5) {
						clearInterval(this.state.timer)
					} else {
						this.setState({ counter: +this.state.counter + 1 });
					}
				}
			})
	}

	render() {
		const { question, answers, receivedAnswer, loading } = this.state;

		if (loading) return (
			<div className="loadingPage">
			<OnLoad />
			<p>Fetching answers...</p>
		</div>
		)
		return (
			<div className="container">
				<QuestionFull question={question} />
				{this.props.loggedInUser && this.props.loggedInUser.answerer ? <AddAnswerForm questionId={question.id} loggedInUser={this.props.loggedInUser} checkTextInBucket={this.checkTextInBucket} receivedAnswer={receivedAnswer} /> : null}
				<AnswerList answers={answers} />
			</div>
		)
	}
}

export default QA_Page;