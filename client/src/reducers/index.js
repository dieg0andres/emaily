import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  // auth is a state property
  auth: authReducer,
  // redux Form reducer requires this to be called form
  form: reduxForm,
  surveys: surveysReducer
});
