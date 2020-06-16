import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import firebase from "./config/firebaseConfig";
import createReduxStore from "./store/createReduxStore";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const rrfConfig = { userProfile: "users", useFirestoreForProfile: true };

const store = createReduxStore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <div>Loading Screen...</div>;
  return children;
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
