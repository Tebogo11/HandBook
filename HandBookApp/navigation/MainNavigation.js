//Import
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import React from "react";
//Import Projects Screen
import HomeScreen from "../screens/Projects/HomeScreen";
import ReadProjectScreen from "../screens/Projects/ReadProjectScreen";
//Import User Screen
import CreateProject from "../screens/User/CreateProjectScreen";
import ConfigProjectScreen from "../screens/User/ConfigProject";
import AuthScreen from "../screens/User/AuthScreen";
import EditProject from "../screens/User/EditProjectScreen";
import UserProjects from "../screens/User/UserProjects";
//import StartUp Screen
import StartUpScreen from "../screens/StartUpScreen";
import { createTabNavigator } from "react-navigation-tabs";
//Icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import {
  HomeStack,
  CreateProjectStack,
  UserStack,
} from "../navigation/StackNavigation";
//Set Colors
// const defaultNavOptions = {
//   headerStyle: {
//     backgroundColor:
//       Platform.OS === "android" ? Colors.accent : Colors.background,
//   },
//   headerTitleStyle: {},
//   headerTintColor: Platform.OS === "android" ? Colors.second : Colors.primary, // chnage header based on OS
// };

//Tab Navigation
const BottomTabNav = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="home-outline" size={24} color="black" />;
      },
    },
  },
  Create: {
    screen: CreateProjectStack,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Octicons name="diff-added" size={24} color="black" />;
      },
      tabBarVisible: false,
    },
  },
  UserScreen: {
    screen: UserStack,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-library-outline" size={24} color="black" />;
      },
    },
  },
});

export default createAppContainer(BottomTabNav);
