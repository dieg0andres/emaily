// SurveyFormReview shows users their form inputs for review

import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields'
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom'

function SurveyFormReview(props) {

  const formValues = props.surveyValues;
  const reviewFields = _.map(formFields, (field)=>{
    return(
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          {formValues[field.name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please Confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={props.onCancel}
      >
        Back
      </button>
      <button
        className="green white-text btn-flat right"
        onClick={()=> props.submitSurvey(formValues, props.history)}
      > Send Survey
      <i className="material-icons right" >email</i>
      </button>
    </div>
  );
}

function mapStateToProps(state) {

  return (
    { surveyValues: state.form.surveyForm.values }
  );
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
