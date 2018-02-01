import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BrowsePage from './pages/BrowsePage';
import QA_Page from './pages/QA_Page';
import fourOFour from './components/fourOFour'
import UserProfile from './pages/UserProfile'
import 'bulma/css/bulma.css';
import './styles.css';

class App extends Component {
	state = {
		loggedInUser: null
	}

  render() {
    return (
      <BrowserRouter>
				<div>
					<Navbar loggedInUser={this.state.loggedInUser} />
					<Switch>
						<Route exact path="/" render={() => <LoginPage setAppUser={this.setAppUser} />}></Route>
						<Route exact path="/dashboard" render={() => <Dashboard loggedInUser = {this.state.loggedInUser}/>}></Route>
						<Route exact path="/questions" render={() => <BrowsePage loggedInUser = {this.state.loggedInUser}/>}></Route>
						<Route exact path="/questions/:question_id" render={(props) => <QA_Page loggedInUser = {this.state.loggedInUser}{...props}/>}></Route>
						<Route exact path="/userprofile/:id" render={(props)=> <UserProfile {...props}/>}/> 
						<Route component={fourOFour}></Route>
					</Switch>
				</div>
			</BrowserRouter>
    );
	}
	
	setAppUser = (user) => {
		this.setState({ loggedInUser: user })
	}


}


export default App;
