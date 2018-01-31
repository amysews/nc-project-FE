import React from 'react';
import AudioRecording from './AudioRecording';
import { postToBucket, postAnswerMetadata } from '../api';

class AddAnswerForm extends React.Component {
	state = {
		addAudio: null,
		addText: null,
		submitted: false,
		userId: '',
    answer: '',
    questionId: ''
	}

	componentWillReceiveProps (newProps) {
	
	this.setState({ questionId: newProps.questionId, userId: newProps.loggedInUser.id })
	}

	handleIncomingAudio = (event) => {
		this.setState({ answer: [event.data] })
	}

	// This should be true for text input or audio input
	handleSubmit = (event) => {
		event.preventDefault();
		const { userId,  answer, questionId } = this.state;
		if (!userId || !answer) return;
		return postAnswerMetadata(userId, questionId)
			.then(({ answerId }) => {
				return postToBucket(answer, answerId, 'a')
			})
			.then(data => {
				console.log(data)
				this.setState({ submitted: true }); // put this on an if statement for success
			})
			.catch(console.error)
	}

	
	handleAnswerChange = (event) => {
		this.setState({ answer: event.target.value })
	}
	useVoice = () => {
		this.setState({ addAudio: true, addText: false })
	}
	useText = () => {
		this.setState({ addText: true, addAudio: false })
	}

	render() {
		const {addAudio, addText, submitted, answer } = this.state;
		return (
			<div>
				<form id="add-answer" onSubmit={this.handleSubmit}>
					<h1>Add a new answer:</h1>

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
								<label className="label">Answer:</label>
								<div className="control">
									<textarea className="textarea" name="answerText" placeholder="Type your answer here" value={answer} onChange={this.handleAnswerChange}></textarea>
								</div>
							</div>
						) : null}

					{addAudio ?
						(
							<div className="field">
								<label className="label">Answer:</label>
								<div className="control">
									<AudioRecording handleIncomingAudio={this.handleIncomingAudio} />
								</div>
							</div>
						) : null}


					<div className="field">
						<div className="control">
							<button className="button is-link" type="submit">Submit</button>
						</div>
					</div>
				</form>
				<span>{submitted ? 'Answer submitted' : null}</span>
			</div>
		)
	}
}

export default AddAnswerForm;