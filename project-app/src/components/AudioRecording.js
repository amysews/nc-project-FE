import React from 'react';

class AudioRecording extends React.Component {
	state = {
		audioRecorder: {},
		src: null
	}

	componentDidMount() {
		this.createAudioRecorder();
	}

	createAudioRecorder = () => {
		navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false
		})
			.then(stream => {
				const audioRecorder = new MediaRecorder(stream);
				audioRecorder.ondataavailable = this.handleOnDataAvailable;
				this.setState({ audioRecorder: audioRecorder })
			})
			.catch(err => {
				console.log(`The following gUM error occured: ${err}`);
			});
	}

	handleOnDataAvailable = (event) => {
		console.log('setting event data to state - chunk');
		this.props.handleIncomingAudio(event)

		this.setState({ src: URL.createObjectURL(event.data) });

	}

	startRecording = (e) => {
		e.preventDefault();
		console.log('start the recording...', this.state.audioRecorder);
		this.state.audioRecorder.start();
	}

	stopRecording = (e) => {
		e.preventDefault();
		console.log('stop the recording...');
		this.state.audioRecorder.stop();
	}


	render() {
		const { src } = this.state;
		return (
			<div>
				<button className="button is-danger is-rounded" onClick={this.startRecording} >Start Recording</button>
				<button className="button is-rounded" onClick={this.stopRecording} >Stop Recording</button>

				<br />
				<audio controls src={src} />

			</div>
		)
	}
}

export default AudioRecording;