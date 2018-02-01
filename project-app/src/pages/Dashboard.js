import React from 'react';
import AddQuestionForm from '../components/AddQuestionForm';
import QuestionList from '../components/QuestionList';
import { fetchAllQuestions, fetchUserQAs } from '../api';

class Dashboard extends React.Component {
  state = {
    loggedInUser: {},
    userQuestions: [],
    unansweredQuestions: [],
    userAnswers: [],
    loading: true
  }

  componentDidMount() {
    const { loggedInUser } = this.props;
    fetchUserQAs(loggedInUser)
      .then(({ userQuestions, unansweredQuestions, userAnswers }) => {
        if (loggedInUser.questioner) { // if questioner then set to state the questions you've asked
          this.setState({ userQuestions, loggedInUser, loading: false })
        } else { // if answerer then set to state the questions without answers yet and the questions you've answered
          this.setState({ userAnswers, loggedInUser, unansweredQuestions, loading: false })
        }
      });
  }

  render() {
    const { loggedInUser, userQuestions, userAnswers, unansweredQuestions, loading } = this.state;
    if (loading) return (<div>Loading</div>)
    else {
      return (
        <div>
          <h1>Welcome, {loggedInUser.first_name}</h1>
          {loggedInUser.questioner ?
            (
              <div>
                <AddQuestionForm loggedInUser={loggedInUser} />
                <h1>These are all of the questions you've asked</h1>
                {userQuestions.length ? <QuestionList questions={userQuestions} /> : <p>No questions</p>}
              </div>
            ) : (
              <div>
                <h1>These are all of the questions you've already answered</h1>
                {userAnswers.length ? <QuestionList questions={userAnswers} /> : <p>No questions</p>}
                <h1>These questions haven't been answered yet</h1>
                {unansweredQuestions.length ? <QuestionList questions={unansweredQuestions} /> : <p>No questions</p>}
              </div>
            )}
        </div>
      )
    }
  }
}

export default Dashboard;