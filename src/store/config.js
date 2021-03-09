import { createStore } from 'redux';

import favLocations from './reducers/favLocation';

export default createStore(favLocations);