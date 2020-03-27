import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import { connect } from 'react-redux';
import SurveyNew from './surveys/SurveyNew';
import * as actions from '../actions';  // this looks at the actions/index.js file


class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

// className = "container"
// used by materialize css ... it adds margin / padding on left/right side of page

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={ Landing } />
            <Route exact path="/surveys" component={ Dashboard } />
            <Route path="/surveys/new" component={ SurveyNew } />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default connect(null, actions)(App);
// actions will be sent to app as props
