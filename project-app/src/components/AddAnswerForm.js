import React from 'react';
import AudioRecording from './AudioRecording';
import { postToBucket, postAnswerMetadata } from '../api';

class AddAnswerForm extends React.Component {
	state = {
		addAudio: null,
		addText: null,
		processing: false,
		receivedAnswer: null,
		userId: '',
		answer: '',
		questionId: '',
		errorMsg: ''
	}

	componentWillReceiveProps(newProps) {

		this.setState({ questionId: newProps.questionId, userId: newProps.loggedInUser.id, receivedAnswer: newProps.receivedAnswer })
	}

	handleIncomingAudio = (event) => {
		this.setState({ answer: [event.data] })
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { userId, answer, questionId } = this.state;
		// Error handling - checks all inputs are present
		if (!userId) {
			this.setState({ errorMsg: "No user selected - please login again" }, () => { return });
		} else if (!answer) {
			this.setState({ errorMsg: "Please add either text or audio recording of your answer" }, () => { return });
		} else if (!questionId) {
			return;
		} else {
			this.startProcessingAnswer(answer, userId, questionId)
			this.setState({ processing: true })
		}
	}

	startProcessingAnswer = (answer, userId, questionId) => {
		return postAnswerMetadata(userId, questionId)
		.then(({ answerId }) => {
			return Promise.all([postToBucket(answer, answerId, 'a'), answerId])
		})
		.then(([data, answerId]) => {
			this.props.checkTextInBucket(answerId)
		})
		.catch(console.error)
	}

	handleAnswerChange = (event) => {
		this.setState({ answer: event.target.value, errorMsg: '' })
	}
	useVoice = () => {
		this.setState({ addAudio: true, addText: false })
	}
	useText = () => {
		this.setState({ addText: true, addAudio: false })
	}

	render() {
		const { addAudio, addText, processing, receivedAnswer, answer, errorMsg } = this.state;
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
							{/* <span>{processing ? 'Processing answer' : null}</span> */}
							<span>{receivedAnswer ? 'Answer received' : processing ? 'Processing answer' : null}</span>
							<span>{errorMsg ? errorMsg : null}</span>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default AddAnswerForm;