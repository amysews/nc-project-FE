const URL = "http://localhost:9091";

exports.fetchAllQuestions = () => {
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

exports.fetchOneQuestionAndAnswers = (id) => {
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

exports.fetchQuestioners = () => {
    return fetch(`${URL}/rds/users`)
    .then(buffer => buffer.json())
    .then(({users}) => {
        const questioners = users.filter(user => user.questioner)
        return questioners;
    })
}

exports.getSignedURL = (filename) => { 
    return fetch(`${URL}/s3/sign?objectName=${filename}`) 
}
