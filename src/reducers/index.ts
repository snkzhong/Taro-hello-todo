import { combineReducers } from 'redux'
import {todosReducer, filterReducer} from './todos'

export default combineReducers({
  todos: todosReducer,
  filter: filterReducer
})
