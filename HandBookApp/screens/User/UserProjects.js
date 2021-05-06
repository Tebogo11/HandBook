import React from "react";
import { Avatar } from "react-native-elements";
import { StyleSheet, Text, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { AsyncStorage } from "react-native";
import Card from "../../compoenents/Card";
import * as projectAction from "../../store/action/projectA";
import * as authActions from "../../store/action/authA";

const UserProjects = (props) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.Project.availableProjects);
  const userID = useSelector((state) => state.auth.userId);
  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <View style={styles.list}>
      <View style={styles.logout}>
        <View style={styles.userInfo}>
          <Avatar
            size="medium"
            rounded
            icon={{ name: "user", color: "black", type: "font-awesome" }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            containerStyle={{ marginLeft: 20, height: 100 }}
          />
          <View>
            <Text> Followers</Text>
            <Text style={{ textAlign: "center" }}>100</Text>
          </View>
          <View>
            <Text> Following</Text>
            <Text style={{ textAlign: "center" }}>100</Text>
          </View>
        </View>
        <Button title="Log out" onPress={logout} />
      </View>
      <FlatList
        keyExtractor={(item) => item.projectID}
        data={projects}
        renderItem={(itemData) => {
          if (itemData.item.ownerID == userID) {
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
          }
        }}
      />
    </View>
  );
};

export default UserProjects;

const styles = StyleSheet.create({
  list: {
    height: "100%",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
});
