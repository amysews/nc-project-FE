import React from 'react';
import AudioRecording from './AudioRecording';
import { postToBucket, postQuestionMetadata } from '../api';

class AddQuestionForm extends React.Component {
	state = {
		addAudio: null,
		addText: null,
		submitted: false,
		userId: '',
		topic: '',
		question: ''
	}

	componentWillReceiveProps(newProps) {
		this.setState({ userId: newProps.loggedInUser.id })
	}

	handleIncomingAudio = (event) => {
		this.setState({ question: [event.data] })
	}

	// This should be true for text input or audio input
	handleSubmit = (event) => {
		event.preventDefault();
		const { userId, topic, question } = this.state;
		if (!userId || !topic || !question) return;
		return postQuestionMetadata(topic, userId)
			.then(({ questionId }) => {
				return postToBucket(question, questionId, 'q')
			})
			.then(data => {
				console.log(data)
				this.setState({ submitted: true }); // put this on an if statement for success
			})
			.catch(console.error)
	}

	handleQuestionChange = (event) => {
		this.setState({ question: event.target.value })
	}
	handleTopicChange = (event) => {
		this.setState({ topic: event.target.value })
	}
	useVoice = () => {
		this.setState({ addAudio: true, addText: false })
	}

	useText = () => {
		this.setState({ addText: true, addAudio: false })
	}

	render() {
		const { addAudio, addText, submitted, topic, question } = this.state;
		return (
			<div>
				<form id="add-question" onSubmit={this.handleSubmit}>
					<h1>Add a new question</h1>

					<div className="field">
						<div className="control">
							<span onClick={this.useVoice} >Add with voice</span>
							{'  |  '}
							<span onClick={this.useText} >Add with text</span>
						</div>
					</div>



					<div>
						<p>You are logged in as {this.props.loggedInUser.first_name} {this.props.loggedInUser.surname}</p>
					</div>



					{addText ?
						(
							<div className="field">
								<label className="label">Question:</label>
								<div className="control">
									<textarea className="textarea" name="questionText" placeholder="Type your question here" value={question} onChange={this.handleQuestionChange}></textarea>
								</div>
							</div>
						) : null}

					{addAudio ?
						(
							<div className="field">
								<label className="label">Question:</label>
								<div className="control">
									<AudioRecording handleIncomingAudio={this.handleIncomingAudio} />
								</div>
							</div>
						) : null}


					<div className="field">
						<label className="label">Topic:</label>
						<div className="control">
							<div className="select">
								<select name="topic" onChange={this.handleTopicChange} value={topic}>
									<option value="" disabled>Select your option</option>
									<option value="Past">Past</option>
									<option value="Advice">Advice</option>
									<option value="Today">Today</option>
								</select>
							</div>
						</div>
					</div>


					<div className="field">
						<div className="control">
							<button className="button is-link" type="submit">Submit</button>
						</div>
					</div>
				</form>
				<span>{submitted ? 'Question submitted' : null}</span>
			</div>
		)
	}
}

export default AddQuestionForm;