import React, { useState } from "react";
import { StyleSheet, Button, Text, View, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as Camera from "expo-camera";

const imageSelector = (props) => {
  const [pickedImage, setpickedImage] = useState();
  const verifyPermission = async () => {
    const result = await Camera.requestPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!, You need to grant camera permissions"
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = async (option) => {
    const hasPermissions = await verifyPermission();
    if (!hasPermissions) {
      Alert.alert("You need to grant us access to your camera ");
    } else if (option == "camera" && hasPermissions) {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      setpickedImage(image.uri);
      props.onImageTake(image.uri);
    } else if (option == "library" && hasPermissions) {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      setpickedImage(image.uri);
      props.onImageTake(image.uri);
    }
  };
  return (
    <View style={styles.screen}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color="blue"
        onPress={() => takeImageHandler("camera")}
      />
      <Button
        title="Choose image from library "
        color="blue"
        onPress={() => takeImageHandler("library")}
      />
    </View>
  );
};

export default imageSelector;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
  },
  image: {
    marginTop: 20,
    width: "100%",
    height: "100%",
  },
});
