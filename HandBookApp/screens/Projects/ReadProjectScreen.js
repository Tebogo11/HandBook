import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import { Icon, Tab, Overlay, Button } from "react-native-elements";
import { Alert } from "react-native";

const ReadProjectScreen = (props) => {
  const [currentPage, setcurrentPage] = useState(0);
  const projects = useSelector((state) => state.Project.availableProjects);
  const projectId = props.navigation.getParam("projectID");
  const [projectPages, setprojectPages] = useState([]);

  const handleTabSelect = (selected) => {
    if (selected == 1) {
    } else if (selected == 2) {
      if (projectPages[0].projectPages.length - 1 == currentPage) {
        Alert.alert("This is the last page");
      } else {
        const nextPage = currentPage + 1;
        setcurrentPage(nextPage);
      }
    } else if (selected == 0) {
      if (currentPage != 0) {
        const lastPage = currentPage - 1;
        setcurrentPage(lastPage);
      }
    }
  };

  const selectedProject = projects.find(
    (project) => project.projectID === projectId
  );

  let listdata;

  projectPages.push(selectedProject);
  listdata = projectPages[0].projectPages[currentPage].pageContent;

  return (
    <View>
      <View style={styles.screen}>
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
                    </View>
                  );
                }
                if (contenttype == "Text") {
                  return (
                    <View style={styles.newComponentView}>
                      <Text selectable>{itemData.item.content}</Text>
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
            icon={
              <Icon name="staro" type="antdesign" size={45} color="black" />
            }
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

export default ReadProjectScreen;

const styles = StyleSheet.create({
  navOptions: {
    alignItems: "center",
    paddingBottom: 20,
  },
  tabStyles: {
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    marginBottom: 10,
  },
  screen: {
    height: "82%",
    justifyContent: "flex-start",
  },
  image: {
    marginTop: 20,
    width: "100%",
    height: "100%",
    marginBottom: 20,
    padding: 10,
  },
  imagePreview: {
    height: 300,
    marginVertical: 5,
  },
  newComponentView: {
    padding: 20,
  },
});
