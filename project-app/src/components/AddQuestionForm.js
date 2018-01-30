import React from 'react';
import AudioRecording from './AudioRecording';
import { fetchQuestioners, getSignedURL, postQuestionToBucket, postTopicMetadata } from '../api';

class AddQuestionForm extends React.Component {
	state = {
		questioners: [],
		audio: null, // might not be needed
		addAudio: null,
		addText: null,
		submitted: false,
		userId: '',
		topic: '',
		question: '' // will either be text string or audio Blob
	}

	componentDidMount() {
		fetchQuestioners()
			.then(questioners => this.setState({ questioners }))
	}

	// This is be true for text input or audio input
	handleSubmit = (event) => {
		event.preventDefault();

		const { userId, topic, question } = this.state;

		if (!userId || !topic || !question) return;

		return postTopicMetadata(topic, userId)
			.then(({ questionId }) => {
				return postQuestionToBucket(question, questionId)
			})
			.then(data => {
				console.log(data)
				this.setState({ submitted: true }); // put this on an if statement for success
			})
			.catch(console.error)
	}

	handleUserChange = (event) => {
		this.setState({
			userId: event.target.value
		})
	}
	handleQuestionChange = (event) => {
		this.setState({
			question: event.target.value
		})
	}
	handleTopicChange = (event) => {
		this.setState({
			topic: event.target.value
		})
	}

	render() {
		const { questioners, audio, addAudio, addText, submitted, userId, topic, question } = this.state;
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


					<div className="field">
						<label className="label">User:</label>
						<div className="control">
							<div className="select">
								<select name="user" onChange={this.handleUserChange} value={userId}>
									<option value="" disabled>Select your option</option>
									{questioners.map((questioner, i) => {
										return <option key={i} value={questioner.id}>{questioner.first_name} {questioner.surname}</option>
									})}
								</select>
							</div>
						</div>
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
									<AudioRecording />
								</div>
							</div>
						) : null}

					{/* <AudioRecording audio={audio} sendAudioBlob={this.sendAudioBlob} /> */}


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

	useVoice = () => {
		this.setState({ addAudio: true, addText: false })
	}

	useText = () => {
		this.setState({ addText: true, addAudio: false })
	}

	// sendBlob = () => {
	// 	this.getSignedURL(filename) // this needs to come from the first put to db
	// 		.then(data => data.json())
	// 		.then(res => {
	// 			const audioBlob = new Blob(this.state.chunks);
	// 			return fetch(res.signedUrl, {
	// 				method: 'PUT',
	// 				body: audioBlob
	// 			})
	// 		})
	// 		.then(console.log)
	// 		.catch(console.log)
	// }
}

export default AddQuestionForm;