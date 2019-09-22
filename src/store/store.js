// redux  reducers
import reducer from '../reducers/index'
// redux
import { createStore } from 'redux'
// actions 


const store = createStore(reducer);

export default store;