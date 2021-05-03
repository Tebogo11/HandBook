import React, { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { FlatList } from "react-native";
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { Icon, Tab, Overlay, Button } from "react-native-elements";
import uuid from "react-native-uuid";
import RNPickerSelect from "react-native-picker-select";

//Import Components
import ImageSelector from "../../compoenents/imageSelector";
import DeleteButton from "../../compoenents/DeleteButton";

const CreateProjectScreen = (props) => {
  //useState
  const [refresh, setrefresh] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [projectPages, setprojectPages] = useState([]);
  const [visible, setVisible] = useState(false);
  //Adding Text Components
  const [NewComponentType, setNewComponentType] = useState();
  const [NewComponentText, setNewComponentText] = useState();
  //Adding Image Component
  const [imageTaken, setimageTaken] = useState();
  //get params
  const projectName = props.navigation.getParam("projectName");
  const projectType = props.navigation.getParam("projectType");

  if (projectPages.length === 0) {
    const newProject = {
      projectID: uuid.v4(),
      ownerID: "u1",
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

  //Sends data to Saveproject screen where the user can submit their project
  const handleDoneRequest = () => {
    const pagesCount = projectPages[0].projectPages.length;

    const pageContentCount = projectPages[0].projectPages[0].pageContent.length;
    if (pagesCount == 1 && pageContentCount == 0) {
      Alert.alert("Please add some content before your submit ");
    } else {
      console.log(projectPages[0]);
      const data = { data: projectPages[0] };
      props.navigation.navigate("SaveProject", {
        project: { ...data },
      });
    }
  };

  useEffect(() => {
    props.navigation.setParams({ submit: handleDoneRequest });
  }, [projectPages]);

  //Create the next page
  const createNextPage = (nextPage) => {
    const newPage = projectPages[0].projectPages[nextPage];
    if (newPage == null) {
      projectPages[0].projectPages.push({
        pageNumber: nextPage,
        pageContent: [],
      });
    }
  };

  //Handle the selected tab value
  const handleTabSelect = (selected) => {
    if (selected == 1) {
      toggleOverlay();
    } else if (selected == 2) {
      const nextPage = currentPage + 1;
      createNextPage(nextPage);
      setcurrentPage(nextPage);
    } else if (selected == 0) {
      if (currentPage != 0) {
        const lastPage = currentPage - 1;
        setcurrentPage(lastPage);
      } else {
        Alert.alert("Your on the last page", "The only ways up");
      }
    }
  };

  //Toggle overlayer to add new component
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //Handle when image has being selected
  const imageTakenHandler = (imagePath) => {
    setimageTaken(imagePath);
  };

  const onDelete = (id) => {
    Alert.alert(
      "Are you sure you want to delete",
      "you will lose this component",
      [
        {
          text: "YES",
          onPress: () => {
            projectPages[0].projectPages[currentPage].pageContent.splice(id, 1);
            setrefresh(true);
            console.log("=--------------------------=");
            console.log(projectPages);
            setrefresh(false);
          },
          style: "cancel",
        },
        {
          text: "NO",
        },
      ]
    );
  };

  const handlerSubmitComponent = () => {
    if (
      (NewComponentType != undefined && imageTaken != undefined) ||
      NewComponentText != undefined
    ) {
      projectPages[0].projectPages[currentPage].pageContent.push({
        contentID: uuid.v4(),
        contentType: NewComponentType,
        content: NewComponentType == "Image" ? imageTaken : NewComponentText,
      });
      toggleOverlay();
      setNewComponentType();

      console.log(projectPages);
    } else {
      Alert.alert("You need a value for all current field");
    }
  };

  const handleNewComponentType = () => {
    if (
      NewComponentType == "Text" ||
      NewComponentType == "Title" ||
      NewComponentType == "Subtitle"
    ) {
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
            <View style={{ borderWidth: 1, height: "9%" }}>
              <RNPickerSelect
                onValueChange={(value) => setNewComponentType(value)}
                items={[
                  { label: "Adding Title", value: "Title" },
                  { label: "Adding Subtitle", value: "Subtitle" },
                  { label: "Adding text", value: "Text" },
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
    } else if (NewComponentType == "Image") {
      return (
        <ImageSelector
          onImageTake={(imageuri) => imageTakenHandler(imageuri)}
        />
      );
    } else if (NewComponentType == null) {
    }
  };

  let listdata = projectPages[0].projectPages[currentPage].pageContent;

  return (
    <View>
      <Overlay overlayStyle={styles.overlayStyle} isVisible={visible}>
        <View style={styles.overlayStyleInput}>
          <Text style={{ marginTop: 20, fontWeight: "bold", marginBottom: 15 }}>
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
              Alert.alert("Are you sure?", "This will delete your hard work", [
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
              ]);
            }}
          />
        </View>
      </Overlay>
      <View style={styles.newContent}>
        {
          <FlatList
            keyExtractor={(item) => item.contentID}
            style={{ margin: 5 }}
            data={listdata}
            renderItem={(itemData) => {
              const contenttype = itemData.item.contentType;
              if (
                contenttype == "Text" ||
                contenttype == "Title" ||
                contenttype == "Subtitle"
              ) {
                if (contenttype == "Title") {
                  return (
                    <View style={styles.newComponentView}>
                      <Text
                        style={{ fontSize: 25, fontWeight: "bold" }}
                        selectable
                      >
                        {itemData.item.content}
                      </Text>
                      <DeleteButton onDelete={() => onDelete(itemData.index)} />
                    </View>
                  );
                }
                if (contenttype == "Subtitle") {
                  return (
                    <View style={styles.newComponentView}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",

                          textAlign: "center",
                        }}
                        selectable
                      >
                        {itemData.item.content}
                      </Text>
                      <DeleteButton onDelete={() => onDelete(itemData.index)} />
                    </View>
                  );
                }
                if (contenttype == "Text") {
                  return (
                    <View style={styles.newComponentView}>
                      <Text selectable>{itemData.item.content}</Text>
                      <DeleteButton onDelete={() => onDelete(itemData.index)} />
                    </View>
                  );
                }
              } else if (contenttype == "Image") {
                return (
                  <View style={styles.imagePreview}>
                    <Image
                      source={{ uri: itemData.item.content }}
                      style={styles.image}
                    />
                    <DeleteButton onDelete={() => onDelete(itemData.index)} />
                  </View>
                );
              }
            }}
          />
        }
      </View>

      <View style={styles.navOptions}>
        <Text>
          Page {currentPage + 1} / {projectPages[0].projectPages.length}
        </Text>
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
  const submit = navData.navigation.getParam("submit");
  return {
    headerTitle: () => {
      return <Text>Project name: {title}</Text>;
    },
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
    headerRight: () => {
      return (
        <Icon
          name="done"
          type="materialicons "
          size={45}
          color="black"
          onPress={submit}
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
  image: {
    width: "100%",
    height: "100%",
  },
  imagePreview: {
    height: 300,
    marginVertical: 5,
  },
  newComponentView: {
    marginVertical: 20,
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
