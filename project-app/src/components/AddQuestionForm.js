import React from 'react';
import AudioRecording from './AudioRecording';
import { fetchQuestioners, getSignedURL } from '../api';

class AddQuestionForm extends React.Component {
	state = {
		questioners: [],
		audio: null,
		addAudio: null,
		addText: null
	}

	componentDidMount() {
		fetchQuestioners()
			.then(questioners => this.setState({ questioners }))
	}

	render() {
		const { questioners, audio, addAudio, addText } = this.state;
		return (
			<form id="add-question">
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
							<select name="user">
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
								<textarea className="textarea" name="questionText" placeholder="Type your question here"></textarea>
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
							<select name="topic">
								<option value="Past">Past</option>
								<option value="Advice">Advice</option>
								<option value="Today">Today</option>
							</select>
						</div>
					</div>
				</div>


				<div className="field">
					<div className="control">
						<button className="button is-link">Submit</button>
					</div>
				</div>
			</form>
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