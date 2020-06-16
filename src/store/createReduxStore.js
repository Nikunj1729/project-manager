import { createStore, applyMiddleware } from "redux";
import { getFirebase } from "react-redux-firebase";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

export default () => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(getFirebase))
  );
};
