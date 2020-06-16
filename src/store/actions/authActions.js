export const signIn = (credentials) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_ERROR", error });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch((error) => {
        dispatch({ type: "SIGNOUT_ERROR", error });
      });
  };
};

export const signUp = (newUser) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();
    try {
      const authResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
      firestore
        .collection("users")
        .doc(authResult.user.uid)
        .set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0],
        })
        .then(() => {
          console.log("Created");
          dispatch({ type: "SIGNUP_SUCCESS" });
        });
    } catch (error) {
      dispatch({ type: "SIGNUP_ERROR", error });
    }
  };
};
