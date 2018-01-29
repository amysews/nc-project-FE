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

				<div class="field">
					<div class="control">
						<span onClick={this.useVoice} >Add with voice</span>
						{'  |  '}
						<span onClick={this.useText} >Add with text</span>
					</div>
				</div>


				<div class="field">
					<label class="label">User:</label>
					<div class="control">
						<div class="select">
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
						<div class="field">
							<label class="label">Question:</label>
							<div class="control">
								<textarea class="textarea" name="questionText" placeholder="Type your question here"></textarea>
							</div>
						</div>
					) : null}

				{addAudio ?
					(
						<div class="field">
							<label class="label">Question:</label>
							<div class="control">
								<AudioRecording />
							</div>
						</div>
					) : null}

				<div class="field">
					<label class="label">Topic:</label>
					<div class="control">
						<div class="select">
							<select name="topic">
								<option value="Past">Past</option>
								<option value="Advice">Advice</option>
								<option value="Today">Today</option>
							</select>
						</div>
					</div>
				</div>


				{/* <AudioRecording audio={audio} sendAudioBlob={this.sendAudioBlob} /> */}
				{/* <AudioRecording /> */}


				<div class="field">
					<div class="control">
						<button class="button is-link">Submit</button>
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