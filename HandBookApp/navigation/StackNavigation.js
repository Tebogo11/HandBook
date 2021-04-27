//Import Projects Screen
import HomeScreen from "../screens/Projects/HomeScreen";
import ReadProjectScreen from "../screens/Projects/ReadProjectScreen";
//Import Creating a Project
import CreateProject from "../screens/User/CreateProjectScreen";
import ConfigProjectScreen from "../screens/User/ConfigProject";
//Admin
import UserProjects from "../screens/User/UserProjects";
import EditProject from "../screens/User/EditProjectScreen";
//Import
import { createStackNavigator } from "react-navigation-stack";

export const HomeStack = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  ReadProject: ReadProjectScreen,
});

export const CreateProjectStack = createStackNavigator({
  ConfigScreen: ConfigProjectScreen,
  Create: CreateProject,
});

CreateProjectStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
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
