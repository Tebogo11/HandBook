import React, { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Tab, Overlay, Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";

const CreateProjectScreen = (props) => {
  //useState
  const [order, setorder] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const [projectPages, setprojectPages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [NewComponentType, setNewComponentType] = useState();
  const [NewComponentText, setNewComponentText] = useState("");
  //get params
  const projectName = props.navigation.getParam("projectName");
  const projectType = props.navigation.getParam("projectType");

  if (projectPages.length === 0) {
    const newProject = {
      projectName: projectName,
      projectType: projectType,
      submitted: false,
      projectPages: [
        {
          pageNumber: currentPage,
          pageContent: [],
        },
      ],
    };
    projectPages.push(newProject);
    console.log(projectPages);
  }

  //Handle the selected tab value
  const handleTabSelect = (selected) => {
    if (selected == 1) {
      toggleOverlay();
    }
  };

  //Toggle overlayer to add new component
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handlerSubmitComponent = () => {
    let nextOrder = order + 1;
    setorder(order + 1);
    projectPages[0].projectPages[currentPage].pageContent.push({
      orderNum: nextOrder,
      contentType: NewComponentType,
      content: NewComponentText,
    });
    console.log(projectPages);
  };

  const handleNewComponentType = () => {
    if (NewComponentType == "Text") {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={100}
            style={styles.background}
          >
            <View>
              <TextInput
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  height: "85%",
                  color: "black",
                }}
                scrollEnabled
                numberOfLines={5}
                onChangeText={(text) => setNewComponentText(text)}
                multiline={true}
                blurOnSubmit={true}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                placeholder="Enter Text here..."
              />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      );
    } else if (NewComponentType == null) {
    }
  };

  return (
    <View>
      <View style={styles.newContent}>
        <Overlay overlayStyle={styles.overlayStyle} isVisible={visible}>
          <View style={styles.overlayStyleInput}>
            <Text
              style={{ marginTop: 20, fontWeight: "bold", marginBottom: 15 }}
            >
              What are you adding?
            </Text>
            <View style={{ borderWidth: 1, height: "9%" }}>
              <RNPickerSelect
                onValueChange={(value) => setNewComponentType(value)}
                items={[
                  { label: "Adding Text", value: "Text" },
                  { label: "Adding Image", value: "Image" },
                  { label: "Adding Video", value: "Video" },
                ]}
                style={{
                  ...pickerSelectStyles,
                  placeholder: {
                    color: "purple",
                    fontSize: 12,
                    fontWeight: "bold",
                  },
                }}
              />
            </View>
            <View>{handleNewComponentType()}</View>
          </View>
          <View style={styles.ButtonContainer}>
            <Button
              buttonStyle={{ width: 130 }}
              title="Submit"
              type="solid"
              onPress={handlerSubmitComponent}
            />
            <Button
              buttonStyle={{ width: 130, backgroundColor: "red" }}
              title="Cancel"
              type="solid"
              onPress={() => {
                Alert.alert(
                  "Are you sure?",
                  "This will delete your hard work",
                  [
                    {
                      text: "YES",
                      onPress: () => {
                        toggleOverlay();
                      },
                      style: "cancel",
                    },
                    {
                      text: "NO",
                    },
                  ]
                );
              }}
            />
          </View>
        </Overlay>
      </View>

      <View>
        <Text>This is where the main content will go </Text>
      </View>
      <View style={styles.navOptions}>
        <Text>Page {currentPage + 1}</Text>
        <Tab onChange={(num) => handleTabSelect(num)}>
          <Tab.Item
            icon={
              <Icon name="arrow-left" type="feather" size={45} color="black" />
            }
            containerStyle={styles.tabStyles}
          />
          <Tab.Item
            icon={<Icon name="add" type="ionicons" size={45} color="black" />}
            containerStyle={styles.tabStyles}
          />
          <Tab.Item
            icon={
              <Icon name="arrow-right" type="feather" size={45} color="black" />
            }
            containerStyle={styles.tabStyles}
          />
        </Tab>
      </View>
    </View>
  );
};

CreateProjectScreen.navigationOptions = (navData) => {
  const cancel = () => {
    Alert.alert("Are you sure?", "This will delete your hard work", [
      {
        text: "YES",
        onPress: () => {
          navData.navigation.pop(2);
        },
        style: "cancel",
      },
      {
        text: "NO",
      },
    ]);
  };
  const title = navData.navigation.getParam("projectName");
  return {
    headerTitle: <Text>Project name: {title}</Text>,
    headerLeft: () => {
      return (
        <Icon
          name="close"
          type="evilicons"
          size={45}
          color="black"
          onPress={cancel}
        />
      );
    },
  };
};

export default CreateProjectScreen;

const styles = StyleSheet.create({
  newContent: {
    height: "82%",
    justifyContent: "flex-start",
  },
  navOptions: {
    alignItems: "center",
    paddingBottom: 20,
  },
  tabStyles: {
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    marginBottom: 10,
  },
  overlayStyle: {
    width: "92%",
    height: "92%",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overlayStyleInput: {
    height: "90%",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderColor: "gray",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.2,
    borderColor: "purple",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
