import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import BrowsePage from './pages/BrowsePage';
import QA_Page from './pages/QA_Page';
import fourOFour from './components/fourOFour'
import 'bulma/css/bulma.css';
import './styles.css';

class App extends Component {
	state = {
		loggedInUser: {}
	}

  render() {
    return (
      <BrowserRouter>
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/" render={() => <LoginPage setAppUser={this.setAppUser} />}></Route>
						{/* <Route exact path="/users" component={Users}></Route> */}
						<Route exact path="/questions" render={() => <BrowsePage loggedInUser = {this.state.loggedInUser}/>}></Route>
						<Route exact path="/questions/:question_id" render={(props) => <QA_Page loggedInUser = {this.state.loggedInUser}{...props}/>}></Route>
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
