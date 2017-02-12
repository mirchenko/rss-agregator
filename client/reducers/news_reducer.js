import { SELECT_NEWS, CLOSE_NEWS } from '../actions/types';
const INITIAL_STATE = {};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SELECT_NEWS:
      return action.payload;
    case CLOSE_NEWS:
      return INITIAL_STATE;
    default: return state;
  }
}
