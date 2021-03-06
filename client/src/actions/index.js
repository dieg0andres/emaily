import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types'

// this is the action creator
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({type: FETCH_USER, payload: res.data });
};

/*

export function fetchUser() {
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({type: FETCH_USER, payload: res.data}))
  }
}


export function fetchUser() {
  return async function(dispatch) {
    const res = await axios.get('/api/current_user')
    dispatch({type: FETCH_USER, payload: res.data})
  }
}

*/


export function handleToken(token) {
  return async function(dispatch) {
    const res = await axios.post('/api/stripe', token)
    // the response to the above request is the User Model... res.data below is User Model
    dispatch( {type: FETCH_USER, payload: res.data} )
  }
}

export function submitSurvey(values, history) {
  return async function(dispatch) {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys')

    dispatch( {type: FETCH_USER, payload: res.data} )
  }
}

export function fetchSurveys() {
  return async function(dispatch) {
    const res = await axios.get('/api/surveys');

    dispatch( { type: FETCH_SURVEYS, payload: res.data } )
  }
}
