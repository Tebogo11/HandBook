import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
//Import Redux and redux-thunk
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
//Redux Store
import projectReducer from "./store/reducer/projectR.js";
import authReducer from "./store/reducer/authR";
import BottomTabNav from "./navigation/MainNavigation";
import { enableScreens } from "react-native-screens";

import NavigationCon from "./navigation/NavContainer";

//FireBase config
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";

enableScreens();

const rootReducer = combineReducers({
  Project: projectReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }
  return (
    <Provider store={store}>
      <NavigationCon />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
