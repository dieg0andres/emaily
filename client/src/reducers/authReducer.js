import { FETCH_USER } from '../actions/types';

// any time that an action comes across with a type FETCH_USER we return actions payload
export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state
  }
}
