import { createStore, applyMiddleware, compose } from "redux";
//import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
