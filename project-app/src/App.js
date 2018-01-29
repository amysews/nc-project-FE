import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import BrowsePage from './pages/BrowsePage';
import QA_Page from './pages/QA_Page';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
				<div>
					<Navbar />
					<Switch>
						<Route exact path="/" component={BrowsePage}></Route>
						{/* <Route exact path="/users" component={Users}></Route> */}
						<Route exact path="/questions" component={BrowsePage}></Route>
						<Route exact path="/questions/:question_id" component={QA_Page}></Route>
						{/* <Route exact path="/submitQuestion" component={SubmitQuestionAudio}></Route> */}
						{/* <Route exact path="/submitQuestion" component={SubmitQuestion}></Route> */}
					</Switch>
				</div>
			</BrowserRouter>
    );
  }
}

export default App;
