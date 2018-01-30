const URL = "http://localhost:9090";

export const fetchAllQuestions = () => {
	let questionsMetaData;
	return fetch(`${URL}/rds/questions`)
		.then(resBuffer => resBuffer.json())
		.then(data => {
			questionsMetaData = data.questions;
			console.log(questionsMetaData);
			const promises = questionsMetaData.filter(question => question.text_in_bucket).map(question => {
				// then fetch the text file out of the bucket using the Q_ID
				return fetch(`${URL}/s3/textstorage?keyName=q${question.id}`).then(buffer => buffer.json())
			})
			return Promise.all(promises);
		})
		.then(questionText => {
			questionsMetaData.forEach((question, i) => {
				questionsMetaData[i]["text"] = questionText[i].text
			})
			return questionsMetaData;
		})
}

export const fetchOneQuestionAndAnswers = (id) => {
	let questionMetaData;
	let answerMetaData;
	// Fetches question meta data
	return fetch(`${URL}/rds/questions/${id}`)
		.then(buffer => buffer.json())
		.then(metaData => questionMetaData = metaData.question)
		.then(() => {
			// Fetches question data (text) from the bucket using the id for that question
			return fetch(`${URL}/s3/textstorage?keyName=q${questionMetaData.id}`)
		})
		.then(buffer => buffer.json())
		.then(questionText => {
			questionMetaData.text = questionText.text;
			// Fetches asker info 
			return fetch(`${URL}/rds/users/${questionMetaData.user_id}`)
		})
		.then(buffer => buffer.json())
		.then(userMetaData => {
			questionMetaData.user = userMetaData;
		})
		.then(() => {
			// Fetches all of the answers with their meta data for that question
			return fetch(`${URL}/rds/questions/${id}/answers`)
		})
		.then(buffer => buffer.json())
		.then(metaData => answerMetaData = metaData.answers)
		.then(() => {
			const promises = answerMetaData.map(answer => {
				// Fetches all of the answer data (text) from the bucket using the answer id's
				return fetch(`${URL}/s3/textstorage?keyName=a${answer.id}`).then(buffer => buffer.json())
			})
			return Promise.all(promises)
		})
		.then(answerText => {
			answerText.forEach((answer, i) => {
				answerMetaData[i]['text'] = answerText[i].text
			})
		})
		.then(() => {
			const promises = answerMetaData.map(answer => {
				return fetch(`${URL}/rds/users/${answer.user_id}`).then(buffer => buffer.json())
			})
			return Promise.all(promises)
		})
		.then((userMetaData) => {
			userMetaData.forEach((user, i) => {
				answerMetaData[i].user = user
			})
			return { question: questionMetaData, answers: answerMetaData }
		})
}

export const fetchQuestioners = () => {
	return fetch(`${URL}/rds/users`)
		.then(buffer => buffer.json())
		.then(({ users }) => {
			const questioners = users.filter(user => user.questioner)
			return questioners;
		})
}

// export const fetchAudioSrc = (id) => {

// }

export const postTopicMetadata = (topic, user_id) => {
	return fetch(`${URL}/rds/questions`, {
		method: 'PUT',
		body: JSON.stringify({ user_id, topic, keywords: topic, answered: 1 }),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
		.then(res => {
			return res.json()
		})

}

export const postQuestionToBucket = (questionText, id) => {       //put question text into bucket.  File is delivered but undefined
	if (typeof questionText === "string") { // inputted as text
		return fetch(`${URL}/s3/textstorage`, {
			method: 'PUT',
			body: JSON.stringify({ questionText, id }),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		})
			.then(res => {
				console.log(res)
				return res.json()
			})
	} else { // inputted as Audio
		return getSignedURL(id)
			.then(data => data.json())
			.then(res => {
				const audioBlob = new Blob(questionText);
				return fetch(res.signedUrl, {
					method: 'PUT',
					body: audioBlob,
					// body: questionText
				})
			})
			.then(res => {
				console.log(res)
			})
	}
}

export const getSignedURL = (filename) => {
	return fetch(`${URL}/s3/sign?objectName=q${filename}`)
}

export const fetchUsers = () => {
	return fetch(`${URL}/rds/users`)
		.then(buffer => buffer.json())
}