import React from 'react';
import AddQuestionForm from '../components/AddQuestionForm';
import QuestionList from '../components/QuestionList';
import { fetchAllQuestions } from '../api';

class Dashboard extends React.Component {
  state = {
    loggedInUser: {},
    userQuestions: []
  }

  componentDidMount () {
    this.fetchUsersQuestions()
      .then(questions => this.setState({ userQuestions: questions, loggedInUser: this.props.loggedInUser }));
  }

  fetchUsersQuestions = () => {
    return fetchAllQuestions()
      .then(questions => {
        const userQuestions = questions.filter(question => question.user_id == this.props.loggedInUser.id);
        return userQuestions;
      })
  }

  render () {
    const { loggedInUser, userQuestions } = this.state;
    return (
      <div>
        <h1>Welcome, {loggedInUser.first_name}</h1>
  
        {loggedInUser.questioner ? 
        (
          <div>
            <AddQuestionForm loggedInUser = {loggedInUser}  /> 
            
            <h1>These are all of the questions you've asked</h1>
            <QuestionList questions={userQuestions} />

          </div>
          
        )  : null}

      </div>
    )
  }
}

export default Dashboard;