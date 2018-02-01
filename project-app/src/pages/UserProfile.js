import React, { Component } from 'react'
import moment from 'moment';
 

  class UserProfile extends React.Component {
    render () {
      const userMetaData = this.props.location.state.linkState
      console.log(userMetaData)
      
      return (
          <div>
          <h1>{userMetaData.first_name} {userMetaData.surname}</h1>
          <h2>{userMetaData.email}</h2>
          <h3>Joined:{ moment(userMetaData.joined_date).format(' dddd Do MMMM YYYY')}</h3>
          <h2>{userMetaData.occupation}</h2>
          <h2>{userMetaData.region}</h2>
          </div>
      )
    }
  }


  export default UserProfile