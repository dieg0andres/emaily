// SurveyNew shows SurveyForm and SurveyFormReview

import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {

  // Classic way to create compenent state
  // constructor(props) {
  //   super(props)
  //
  //   this.state = { showFormReview: false };
  // }

  // because of Create Redeact App we can be more concise
  state = { showFormReview: false };

  renderContent() {
    if(this.state.showFormReview) {
        return (
          <SurveyFormReview
            onCancel={() => this.setState({showFormReview:false})}
          />
        );
    }

    return (
      <SurveyForm
        onSurveySubmit = {() => this.setState({showFormReview:true})}
      />
    );
  }

  render() {
    return(
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm',
  destroyOnUnmount: true  // default, but i want to be explicit here because i'm nust learning
})(SurveyNew);
