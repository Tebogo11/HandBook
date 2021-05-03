import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";

import * as authAction from "../store/action/authA";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformData;
      const expirationDate = new Date(expiryDate);

      // check all data is vaild
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      props.navigation.navigate("Main");
      dispatch(authAction.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
