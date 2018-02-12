import React from 'react';
import AudioRecording from './AudioRecording';
import { postToBucket, postQuestionMetadata } from '../api';

class AddQuestionForm extends React.Component {
	state = {
		addAudio: true,
		addText: false,
		submitted: false,
		userId: '',
		topic: "Past",
		question: '',
		errorMsg: ''
	}

	componentDidMount() {
		this.setState({ userId: this.props.loggedInUser.id })
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

		if (!userId) {
			this.setState({ errorMsg: "No user selected - please login again" }, () => { return });
		} else if (!question) {
			this.setState({ errorMsg: "Please add either text or audio recording of your question" }, () => { return });
		} else if (!topic) {
			this.setState({ errorMsg: "No topic selected - please select one from the dropdown" }, () => { return });
		} else {
			return postQuestionMetadata(topic, userId)
				.then(({ questionId }) => {
					return postToBucket(question, questionId, 'q')
				})
				.then(data => {
					console.log(data)
					this.setState({ submitted: true, errorMsg: '' }); // put this on an if statement for success
				})
				.catch(console.error)
		}

	}

	handleQuestionChange = (event) => {
		this.setState({ question: event.target.value, errorMsg: '' })
	}

	useVoice = () => {
		this.setState({ addAudio: true, addText: false })
	}

	useText = () => {
		this.setState({ addText: true, addAudio: false })
	}

	render() {
		const { addAudio, addText, submitted, topic, question, errorMsg } = this.state;

		return (
			<div className="forms">
					<h1 className="headings">Add a new question</h1>
				<form className="inside-forms" onSubmit={this.handleSubmit}>
					<div className="field">
						<div className="control">
							<a className="button is-medium" disabled={addAudio ? true : false}>
								<span onClick={this.useVoice}  >Add with voice</span>
								<span className="icon is-medium">
									<i className="fas fa-microphone"></i>
								</span>
							</a>

							{'    '}
							<a className="button is-medium" disabled={addText ? true : false}>
								<span className="icon is-medium">
									<i className="far fa-file-alt"></i>
								</span>
								<span onClick={this.useText} >Add with text</span>
							</a>

						</div>
					</div>

					{addText ?
						(
							<div className="field">
								<div className="control">
									<textarea className="textarea" name="questionText" placeholder="Type your question here" value={question} onChange={this.handleQuestionChange}></textarea>
								</div>
							</div>
						) : null}

					{addAudio ?
						(
							<div className="field">
								<div className="control">
									<AudioRecording handleIncomingAudio={this.handleIncomingAudio} />
								</div>
							</div>
						) : null}


					<div className="field">
						<div className="control">
							<button className="button is-link is-rounded" type="submit">Submit</button>
							<span>{submitted ? 'Question submitted' : null}</span>
							<span>{errorMsg ? errorMsg : null}</span>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default AddQuestionForm;