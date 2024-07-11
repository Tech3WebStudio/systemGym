import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import authReducer from './reducer/authReducer';
import membersReducer from './reducer/membersReducer'
import classReducer from "./reducer/classReducer";
import plansReducer from "./reducer/plansReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  members: membersReducer,
  class: classReducer,
  plans: plansReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

//pasar reducer config file como argumento
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;