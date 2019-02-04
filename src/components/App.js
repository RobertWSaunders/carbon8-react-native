import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

import { 
  createBottomTabNavigator, 
  createSwitchNavigator, 
  createStackNavigator, 
  createAppContainer 
} from "react-navigation";

import AuthLoadingScreen from "./AuthStack/AuthLoadingScreen";
import AccountScreen from "./TabStack/AccountScreen";
import SignupScreen from "./AuthStack/SignupScreen";
import LoginScreen from "./AuthStack/LoginScreen";
import HomeScreen from "./TabStack/HomeScreen";
import MapScreen from "./TabStack/MapScreen";
import ScanModal from "./Modal/ScanModal";

const AuthStack = createStackNavigator(
  {
    Signup: SignupScreen,
    Login: LoginScreen
  }
)

const MapStack = createStackNavigator(
  {
    Map: MapScreen
  }
);

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
);

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen
  }
)

MapStack.navigationOptions = {
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

HomeStack.navigationOptions = {
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

AccountStack.navigationOptions = {
  tabBarLabel: "Account",
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <Icon
      name="ios-contact"
      size={25}
      color={tintColor}
      style={{ marginTop: 5 }}
    />
  )
};

const TabStack = createBottomTabNavigator(
  {
    Map: MapStack,
    Home: HomeStack,
    Account: AccountStack
  },
  {
    initialRouteName: 'Home',
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
    Main: TabStack,
    ScanModal: ScanModal
  },
  {
    mode: "modal",
    headerMode: "none"
  },
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
));