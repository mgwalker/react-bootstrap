import { combineReducers } from 'redux';

const stateShape = {
};

const distinctReducers = combineReducers({
});

export default function (state = stateShape, action) {
  let newState = state;

  newState = distinctReducers(state, action);

  return newState;
}
