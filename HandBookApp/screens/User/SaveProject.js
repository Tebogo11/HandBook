import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useDispatch } from "react-redux";

//redux action
import * as projectAction from "../../store/action/projectA";

const SaveProject = (props) => {
  const [project, setproject] = useState();
  const [projectName, setprojectName] = useState();
  const [projectType, setprojectType] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    const data = props.navigation.getParam("project");
    console.log("-----------[Project to be Submitted]--------------");
    setproject(data.data);
    //Set default Name and Type of the projects
    setprojectName(data.data.projectName);
    setprojectType(data.data.projectType);
  }, [dispatch]);

  const setProjectName = (text) => {
    project.projectName = text;
  };

  const setProjectType = (text) => {
    project.projectText = text;
  };

  const saveProject = () => {
    const newProject = project;
    dispatch(projectAction.creatingProjects(newProject));
    props.navigation.navigate("ConfigScreen");
    props.navigation.navigate("Home");
  };

  return (
    <View style={styles.screen}>
      <Input
        placeholder="Project Name"
        onChangeText={(text) => {
          setprojectName(text);
          setProjectName(text);
        }}
        value={projectName}
      />

      <Input
        placeholder="Project Type"
        onChangeText={(text) => {
          setprojectType(text);
          setProjectType(text);
        }}
        value={projectType}
      />
      <View>
        <Button title="Save" onPress={saveProject} />
        <Text style={styles.description}>Save and keep it to yourself</Text>
      </View>
      <View>
        <Button title="Publish" />
        <Text style={styles.description}>Publish and share with everyone</Text>
      </View>
    </View>
  );
};

export default SaveProject;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    color: "grey",
  },
});
