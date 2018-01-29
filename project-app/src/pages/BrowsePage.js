import React, { Component } from 'react';
import QuestionList from '../components/QuestionList';

class BrowsePage extends Component {
	state = {
		questions: [{text: "Example question 1"}, {text: "Example question 2"}, {text: "Example question 3"}]
	}

	render() {
		const { questions } = this.state;
		return (
			<QuestionList questions={questions} />
		)
	}
}

export default BrowsePage;