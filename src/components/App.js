import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";

import AuthLoadingScreen from "./AuthLoadingScreen";
import AccountScreen from "./AccountScreen";
import SignupScreen from "./SignupScreen";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import MapScreen from "./MapScreen";

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