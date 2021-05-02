import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SearchBar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

const HomeScreen = (props) => {
  const projects = useSelector((state) => state.Project.availableProjects);

  if (projects.length !== 0) {
    console.log(projects);
  }

  return (
    <View>
      <StatusBar />
      <SearchBar lightTheme placeholder="Type Here..." />
      <FlatList
        keyExtractor={(item) => item.projectID}
        data={projects}
        renderItem={(itemData) => {
          return <Text>{itemData.item.projectName}</Text>;
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
