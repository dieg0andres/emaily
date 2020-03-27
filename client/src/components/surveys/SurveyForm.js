// SurveyForm shows a form for a user to add input

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import _ from 'lodash';
import FIELDS from './formFields';

// Field can render any traditional HTML elements ... e.g. textbox, radio button, etc
// Field is a swiss army knife, but requires several inputs

// reduxForm takes the value typed into surveyTitle and saves it into the redux store under a key surveyTitle

// component: html input tag (before refractoring)
// type: html type text

// main purpose of reduxForm: reduxForm adds the props.hadleSubmit function... which calls my function when the form is submitted



class SurveyForm extends Component {

  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field key={name} label={label} type="text" name={name} component={SurveyField} />
      );
    });
  }

  render() {
    return (
        <div>
          <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit )}>
            { this.renderFields() }
            <Link to="/surveys" className="red btn-flat white-text left">
              Cancel
            </Link>
            <button className="teal btn-flat right white-text" type='submit'>Next
            <i className="material-icons right">done</i></button>
          </form>
        </div>
    );
  }
}

// ran every time user attempts to submit form
// values is an object of all the items in the form
// validate returns an object: if empty, then redux-form assumes the form is good to go,
// if the errors object has properties / values, then redux-form assumes something went wrong and stop the submission process
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

// redux-form automatically matches up the error property (i.e. title) to the different fields being rendered in Form (as props, meta)
// errors.title (title) must be name the same as values.title (title) for redux-form to match things up
 _.each(FIELDS, ( {name} ) => {
   // like saying values.title, values.subject, values.body... at each iteration
   if (!values[name]) {
     errors[name] = "Value needed";
   }
 });



  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm', // surveyForm is the name in the state in the redux store
  destroyOnUnmount: false
})(SurveyForm);

//original before refractoring....
// renderFields() {
//   return(
//     <div>
//       <Field label='Survey title' type = 'text' name = 'title' component = {SurveyField} />
//       <Field label='Subject line' type = 'text' name = 'subject' component = {SurveyField} />
//       <Field label='Email body' type = 'text' name = 'body' component = {SurveyField} />
//       <Field label='Recipient list' type = 'text' name = 'emails' component = {SurveyField} />
//     </div>
//   );
// }
