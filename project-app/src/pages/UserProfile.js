import React, { Component } from 'react'
import moment from 'moment';
import { fetchAllQuestions, fetchUserQAs } from '../api';
import QuestionList from '../components/QuestionList';
import AddQuestionForm from '../components/AddQuestionForm';

  class UserProfile extends React.Component {
    state = {
      user_Profile: {},
      userQuestions: [],
      unansweredQuestions: [],
      userAnswers: [],
      loading: true
    }

    componentDidMount() {
      
      const  user_Profile  = this.props.location.state.linkState
      console.log(user_Profile.id, 'id')
      console.log(user_Profile, '*****')
      fetchUserQAs(user_Profile)
        .then(({ userQuestions, unansweredQuestions, userAnswers }) => {
          if (user_Profile.questioner) { // if questioner then set to state the questions you've asked
            this.setState({ userQuestions, user_Profile, loading: false })
          } else { // if answerer then set to state the questions without answers yet and the questions you've answered
            this.setState({ userAnswers, user_Profile, unansweredQuestions, loading: false })
          }
        });
    }



    render () {
      
      const { user_Profile, userQuestions, userAnswers, unansweredQuestions, loading } = this.state;
      if (loading) return (<div>Loading</div>)
      else {
      return (
          <div>
          <h1>{user_Profile.first_name} {user_Profile.surname}</h1>
          <h2>{user_Profile.email}</h2>
          <h3>Joined:{ moment(user_Profile.joined_date).format(' dddd Do MMMM YYYY')}</h3>
          <h2>{user_Profile.occupation}</h2>
          <h2>{user_Profile.region}</h2>

          <div>
            {user_Profile.questioner ?
              (
                <div>
                  <AddQuestionForm user_Profile={user_Profile} />
                  <h1>These are all {user_Profile.first_name}'s questions</h1>
                  {userQuestions.length ? <QuestionList questions={userQuestions} /> : <p>No questions</p>}
                </div>
              ) : (
                <div>
                  <h1>These are all {user_Profile.first_name}'s answers</h1>
                  {userAnswers.length ? <QuestionList questions={userAnswers} /> : <p>No questions</p>}
                </div>
              )}
          </div>
          </div>
      )
    }
    }
  }


  export default UserProfile