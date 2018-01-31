import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import BrowsePage from './pages/BrowsePage';
import QA_Page from './pages/QA_Page';
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
						<Route exact path="/questions" component={BrowsePage}></Route>
						<Route exact path="/questions/:question_id" component={QA_Page}></Route>
					</Switch>
				</div>
			</BrowserRouter>
    );
	}
	
	setAppUser = (user) => {
		this.setState({ loggedInUser: user })
	}

	// MyLoginPage = (props) => {
	// 	return (
	// 		<LoginPage setAppUser={this.setAppUser} />
	// 	)
	// }
}


export default App;
