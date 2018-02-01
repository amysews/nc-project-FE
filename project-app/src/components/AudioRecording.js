import React from 'react';

class AudioRecording extends React.Component {
	state = {
		audioRecorder: {},
		src: null,
		isToggleOn: true
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

	

	handleClick (e) {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
		this.state.isToggleOn ? this.startRecording(e) : this.stopRecording(e)
	}

	render() {
		const { src } = this.state;
		const handleClick = this.handleClick.bind(this)
		let buttonToggle = ''
		this.state.isToggleOn ? buttonToggle = "button is-success is-rounded" : buttonToggle = "button is-dark button is-rounded"
		
		return (
			<div>
				<button onClick={handleClick} className={buttonToggle}>
					{this.state.isToggleOn ? 'Start Recording' : 'Stop Recording'}
				</button>
				<audio controls src={src} />

			</div>
		)
	}
}

export default AudioRecording;