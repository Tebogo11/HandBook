import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import * as authAction from "../../store/action/authA";

import Card from "../../compoenents/Card";
import Input from "../../compoenents/input";

const FORM_UPDATE = "FORM_UPDATE"; // Will check of this action
const formReducer = (state, action) => {
  if (action.type === "FORM_UPDATE") {
    const updatedValues = {
      ...state.inputValue,
      [action.input]: action.value,
    };
    const updatedValidations = {
      ...state.inputValidations,
      [action.input]: action.isValid,
    };
    let formIsValid = true;
    for (const key in updatedValidations) {
      formIsValid = formIsValid && updatedValidations[key];
    }
    return {
      formIsValid: formIsValid,
      inputValidations: updatedValidations,
      inputValue: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState();
  const [isSignup, setisSignup] = useState(false);
  const dispatch = useDispatch();

  const [state, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
      email: "",
      password: "",
    }, //initial values
    inputValidations: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier, // the key that links to reducer
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authAction.signup(
        state.inputValue.email,
        state.inputValue.password
      );
    } else {
      action = authAction.login(
        state.inputValue.email,
        state.inputValue.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Main");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Error) {
      Alert.alert("An Error Occurred", Error, { text: "Okay" });
    }
  }, [Error]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <Input
          id="email"
          label="E-mail"
          keyboradType="email-address"
          required
          autoCapitalize="none"
          onInputChange={inputChangeHandler}
          errorText="Please enter a vaild email address"
          initialValue=""
        />
        <Input
          id="password"
          label="Password"
          keyboradType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorText="Please enter a vaild Password"
          onInputChange={inputChangeHandler}
          initialValue=""
        />

        {IsLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Button
            title={isSignup ? "Sign Up" : "Login"}
            onPress={authHandler}
          />
        )}
        <Button
          title={`Switch to Sign ${isSignup ? "Login" : "Signup"}`}
          onPress={() => {
            setisSignup((prevState) => !prevState);
          }} // get old state and change it to oppsite
        />
      </Card>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = () => {
  return {
    headerTitle: "Login",
  };
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 500,
    marginHorizontal: 30,
    marginVertical: 100,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
