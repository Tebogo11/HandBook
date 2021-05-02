import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button as HeaderB,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Input, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";

const ConfigProject = (props) => {
  const [projectName, setprojectName] = useState("");
  const [projectType, setprojectType] = useState("");

  const CreateNewProject = () => {
    console.log("Create New Project ");
    if (projectName == "" || projectType == "") {
      Alert.alert("Missing Data", "Please fill out missing fields");
    } else {
      props.navigation.navigate("Create", {
        projectName: projectName,
        projectType: projectType,
      });
    }
  };

  return (
    <View style={styles.InputField}>
      <Input
        label="Enter Project Name"
        placeholder="Project Name"
        style={styles.Input}
        errorMessage="Please fill out this field"
        containerStyle={styles.ViewInput}
        onChangeText={(text) => {
          setprojectName(text);
        }}
      />
      <Input
        label="Enter Project Type (e.g Cook book,Tuturial,..."
        placeholder="Project Type"
        style={styles.Input}
        errorMessage="Please fill out this field"
        containerStyle={styles.ViewInput}
        onChangeText={(text) => {
          setprojectType(text);
        }}
      />

      <Button
        icon={<MaterialIcons name="create" size={24} color="white" />}
        title="CREATE"
        type="solid"
        onPress={CreateNewProject}
        titleStyle={styles.button}
        containerStyle={styles.ButtonContainer}
      />
    </View>
  );
};

ConfigProject.navigationOptions = (navData) => {
  return {
    headerLeft: () => {
      return (
        <HeaderB
          color="black"
          title="Back"
          onPress={() => {
            navData.navigation.navigate("Home");
          }}
        />
      );
    },
  };
};

export default ConfigProject;

const styles = StyleSheet.create({
  InputField: {
    marginTop: "30%",
  },
  Input: {
    textAlign: "center",
  },
  ViewInput: {
    paddingBottom: "10%",
  },
  button: {
    color: "white",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
