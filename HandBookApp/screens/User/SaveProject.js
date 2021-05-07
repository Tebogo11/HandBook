import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import * as firebase from "firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

//redux action
import * as projectAction from "../../store/action/projectA";

const SaveProject = (props) => {
  const [project, setproject] = useState();
  const [projectName, setprojectName] = useState();
  const [projectType, setprojectType] = useState();
  const [currentPageCount, setcurrentPageCount] = useState(0);
  const [currentPageContent, setcurrentPageContent] = useState(0);

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
    uploadImagesToServer(project);
  };

  const uploadImagesToServer = async (newproject) => {
    let currentPage = 0;
    let currentContent = 0;
    const item = newproject.projectPages;
    const pageLength = newproject.projectPages.length;
    const pageContentLength =
      newproject.projectPages[pageLength - 1].pageContent.length;
    console.log(newproject);
    let endKeyOne = false;
    let endKeyTwo = false;
    item.forEach((item, index) => {
      currentPage = index;
      console.log(index);

      item.pageContent.forEach((item, ContentIndex) => {
        currentContent = ContentIndex;
        console.log(ContentIndex);
        const endOfPage = project.projectPages[currentPage + 1];
        const end =
          project.projectPages[currentPage].pageContent[currentContent + 1];
        if (item.contentType == "Image") {
          //store content to firebase Store

          uploadImage(
            item.content,
            item.ContentID,
            currentPage,
            currentContent
          );
        } else if (end == undefined && endOfPage == undefined) {
          dispatch(projectAction.creatingProjects(project));
          props.navigation.navigate("ConfigScreen");
          props.navigation.navigate("Home");
        }
      });
    });
  };

  const uploadImage = async (uri, imageName, currentPage, currentContent) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const uploadTask = firebase
      .storage()
      .ref()
      .child("images/" + imageName)
      .put(blob);

    let imageurl;
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        //handle error
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          project.projectPages[currentPage].pageContent[
            currentContent
          ].content = downloadURL;
        });

        const endOfPage = project.projectPages[currentPage + 1];
        const end =
          project.projectPages[currentPage].pageContent[currentContent + 1];
        if (end == undefined && endOfPage == undefined) {
          dispatch(projectAction.creatingProjects(project));
          props.navigation.navigate("ConfigScreen");
          props.navigation.navigate("Home");
        }
      }
    );
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
