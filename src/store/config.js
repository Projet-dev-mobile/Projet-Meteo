import { createStore } from 'redux';

import favLocationsReducer from './reducers/favLocation';

export default createStore(favLocationsReducer);