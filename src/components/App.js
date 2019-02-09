import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

// Auth Stack Screens

import AuthLoadingScreen from "./AuthStack/AuthLoadingScreen";
import SignupScreen from "./AuthStack/SignupScreen";
import ResetScreen from "./AuthStack/ResetScreen";
import LoginScreen from "./AuthStack/LoginScreen";

// Home Stack Screens

import HomeScreen from "./TabStack/HomeStack/HomeScreen";

// Map Stack Screens

import MapScreen from "./TabStack/MapStack/MapScreen";

// Account Stack Screens

import PricingPlansScreen from "./TabStack/AccountStack/PricingPlansScreen";
import PreferencesScreen from "./TabStack/AccountStack/PreferencesScreen";
import AccountScreen from "./TabStack/AccountStack/AccountScreen";
import WebsiteScreen from "./TabStack/AccountStack/WebsiteScreen";
import AboutScreen from "./TabStack/AccountStack/AboutScreen";

// App Stack Modal Screens

import ScanModal from "./Modal/ScanModal";
import LogModal from "./Modal/LogModal";

const AuthStack = createStackNavigator(
  {
    Signup: SignupScreen,
    Login: LoginScreen,
    Reset: ResetScreen
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerTintColor: "#000"
    }
  }
);

const MapStack = createStackNavigator(
  {
    Map: MapScreen
  },
  {
    initialRouteName: "Map",
    defaultNavigationOptions: {
      headerTintColor: "#000"
    }
  }
);

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerTintColor: "#000"
    }
  }
);

const AccountStack = createStackNavigator(
  {
    PricingPlans: PricingPlansScreen,
    Preferences: PreferencesScreen,
    Website: WebsiteScreen,
    Account: AccountScreen,
    About: AboutScreen
  },
  {
    initialRouteName: "Account",
    defaultNavigationOptions: {
      headerTintColor: "#000"
    }
  }
);

MapStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: "Map",
    tabBarIcon: ({ focused, horizontal, tintColor }) => (
      <Icon
        name="ios-map"
        size={25}
        color={tintColor}
        style={{ marginTop: 5 }}
      />
    )
  };
};

HomeStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: "Water Log",
    tabBarIcon: ({ focused, horizontal, tintColor }) => (
      <Icon
        name="ios-water"
        size={25}
        color={tintColor}
        style={{ marginTop: 5 }}
      />
    )
  };
};

AccountStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: "Account",
    tabBarVisible,
    tabBarIcon: ({ focused, horizontal, tintColor }) => (
      <Icon
        name="ios-contact"
        size={25}
        color={tintColor}
        style={{ marginTop: 5 }}
      />
    )
  };
};

const TabStack = createBottomTabNavigator(
  {
    Map: MapStack,
    Home: HomeStack,
    Account: AccountStack
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: "#000",
      inactiveTintColor: "#4a4a4a",
      labelStyle: {
        fontSize: 10
      }
    }
  }
);

const AppStack = createStackNavigator(
  {
    ScanModal: ScanModal,
    LogModal: LogModal,
    Main: TabStack
  },
  {
    initialRouteName: "Main",
    headerMode: "none",
    mode: "modal"
  },
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: "AuthLoading"
  }
));
