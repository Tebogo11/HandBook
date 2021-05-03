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

const HomeScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const projects = useSelector((state) => state.Project.availableProjects);

  const dispatch = useDispatch();

  dispatch(projectAction.fetchProjects());

  return (
    <View>
      <StatusBar />
      <SearchBar lightTheme placeholder="Type Here..." />
      <FlatList
        data={projects}
        renderItem={(itemData) => {
          return (
            <Card>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
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
  );
};

HomeScreen.navigationOptions = (navData) => {
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
});
