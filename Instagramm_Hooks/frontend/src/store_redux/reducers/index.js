import {combineReducers} from "redux"

import posteReducer from "./posteReducer"
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
    posteReducer , //key:value
    authReducer,
    userReducer
})
