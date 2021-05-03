//Import Projects Screen
import HomeScreen from "../screens/Projects/HomeScreen";
import ReadProjectScreen from "../screens/Projects/ReadProjectScreen";
//Import Creating a Project
import CreateProject from "../screens/User/CreateProjectScreen";
import ConfigProjectScreen from "../screens/User/ConfigProject";
import SaveProjectScreen from "../screens/User/SaveProject";
//Admin
import UserProjects from "../screens/User/UserProjects";
import EditProject from "../screens/User/EditProjectScreen";
//Import
import { createStackNavigator } from "react-navigation-stack";

export const HomeStack = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  ReadProject: ReadProjectScreen,
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index == 1) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export const CreateProjectStack = createStackNavigator({
  ConfigScreen: ConfigProjectScreen,
  Create: {
    screen: CreateProject,
    navigationOptions: { gestureDirection: "vertical" },
  },
  SaveProject: {
    screen: SaveProjectScreen,
    navigationOptions: {
      gestureDirection: "horizontal",
    },
  },
});

CreateProjectStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index >= 1) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export const UserStack = createStackNavigator({
  UserProjects: UserProjects,
  Edit: EditProject,
  Read: ReadProjectScreen,
});
