import React from "react";
import { Icon, Button } from "react-native-elements";

const DeleteButton = (props) => {
  return (
    <Button
      icon={<Icon name="delete" type="antdesign" color="red" />}
      style={{
        alignItems: "center",
      }}
      type="clear"
      onPress={props.onDelete}
    />
  );
};

export default DeleteButton;
