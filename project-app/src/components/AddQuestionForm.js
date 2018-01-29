import React from 'react';
import AudioRecording from './AudioRecording';
import { fetchQuestioners, getSignedURL } from '../api';

class AddQuestionForm extends React.Component {
    state = {
        questioners: [],
        audio: null
    }

    componentDidMount () {
        fetchQuestioners()
            .then(questioners => this.setState({ questioners }))
    }

    render() {
        const { questioners, audio } = this.state;
        return (
            <form>
                User:<br />
                <select name="user">
                    {questioners.map((questioner, i) => {
                        return <option key={i} value={questioner.id}>{questioner.first_name} {questioner.surname}</option>
                    })}
                </select><br />
                Question:<br />
                <textarea name="questionText" /><br />
                {/* <AudioRecording audio={audio} sendAudioBlob={this.sendAudioBlob} /> */}
                <AudioRecording />
                Topic:<br />
                <input type="text" name="topic" /><br />
                <button type="submit">Submit</button>
            </form>
        )
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