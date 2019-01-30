import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";

import AuthLoadingScreen from "./AuthStack/AuthLoadingScreen";
import AccountScreen from "./AppStack/AccountScreen";
import SignupScreen from "./AuthStack/SignupScreen";
import LoginScreen from "./AuthStack/LoginScreen";
import HomeScreen from "./AppStack/HomeScreen";
import MapScreen from "./AppStack/MapScreen";

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
  }
);

const AccountStack = createStackNavigator(
  {
    Account: AccountScreen
  }
)

const AppStack = createBottomTabNavigator(
  {
    Map: MapStack,
    Home: HomeStack,
    Account: AccountStack
  },
  {
    initialRouteName: 'Home',
  }
);


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));