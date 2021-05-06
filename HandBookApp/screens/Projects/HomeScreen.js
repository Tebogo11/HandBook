import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SearchBar, Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

import Card from "../../compoenents/Card";
import * as projectAction from "../../store/action/projectA";
import * as authActions from "../../store/action/authA";
const HomeScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const projects = useSelector((state) => state.Project.availableProjects);
  const dispatch = useDispatch();
  const [Error, setError] = useState();

  const loadProjects = useCallback(async () => {
    console.log("loadprojects action");
    setisRefreshing(true);
    setError(null);
    try {
      await dispatch(projectAction.fetchProjects());
    } catch (err) {
      setError(err.message);
    }
    setisRefreshing(false);
  }, [dispatch, setisLoading, setError]);

  useEffect(() => {
    setisLoading(true);
    loadProjects().then(() => {
      setisLoading(false);
    });
  }, [dispatch, loadProjects]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProjects()
    );
    return willFocusSub.remove();
  }, [loadProjects]);

  if (isLoading) {
    <View style={styles.centered}>
      <ActivityIndicator size="large" />
    </View>; // Loading bar
  }

  if (!isLoading && projects.length === 0) {
    return (
      <View>
        <Text style={styles.error}>
          No products found. maybe start adding some
        </Text>
      </View>
    );
  }

  return (
    <View>
      <StatusBar />
      <View style={styles.list}>
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={loadProjects}
              refreshing={isRefreshing}
              tintColor="yellow"
            />
          }
          keyExtractor={(item) => item.projectID}
          data={projects}
          renderItem={(itemData) => {
            return (
              <Card>
                <Text style={{ fontSize: 14, color: "black" }}>
                  Title: {itemData.item.projectName}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  ProjectType: {itemData.item.projectType}
                </Text>
                <Text style={{ fontSize: 12 }}>Author: John Smith</Text>
                <Button
                  title="Read"
                  onPress={() => {
                    const id = itemData.item.projectID;
                    props.navigation.navigate("ReadProject", {
                      projectID: id,
                    });
                  }}
                />
              </Card>
            );
          }}
        />
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = (navData) => {
  const dispatch = navData.navigation.getParam("logout");
  return {
    headerTitle: "",
    headerLeft: () => {
      return <Text style={styles.logo}>HandBook</Text>;
    },
  };
};

export default HomeScreen;

const styles = StyleSheet.create({
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    height: "100%",
  },
});
