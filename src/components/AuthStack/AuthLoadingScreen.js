import { View, Image, ActivityIndicator, AsyncStorage } from "react-native";
import React, { Component } from "react";
import Config from "react-native-config";
import { connect } from "react-redux";
import axios from "axios";

import { selectors, actionCreators } from "../../ClientStore";

const { getServerSocketConnected, getAuthenticated } = selectors;
const { triggerServerConnection, authenticate } = actionCreators;

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.bootstrapApplication();
  }

  async bootstrapApplication() {
    try {
      const oldAccessToken = await AsyncStorage.getItem(Config.APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY);

      if (oldAccessToken === null) {
        return this.props.navigation.navigate("Auth");
      }

      const res = await axios.get(`${Config.CARBON8_SERVER_URL}/auth/sessionFromAccessToken`, {
        headers: {
          "Authorization": `Bearer ${oldAccessToken}`
        }
      });

      const { user, appSessionId, scanCode, appAccessToken } = res.data;

      this.props.authenticate({
        user,
        scanCode,
        appSessionId
      });

      await AsyncStorage.setItem(Config.APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY, appAccessToken);

      this.props.triggerServerConnection();
    } catch (err) {
      console.log(err.response);
      setTimeout(() => {
        this.props.navigation.navigate('Auth');
      }, 800);
    }
  }

  render() {
    const { authenticated, serverSocketConnected } = this.props;

    if (authenticated && serverSocketConnected) {
      setTimeout(() => this.props.navigation.navigate('App'));
    }

    return (
      <View style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Image
          source={require("../../assets/carbon8WordmarkLogoBlack.png")}
          style={{
            width: 200,
            height: 46,
            resizeMode: "contain",
            marginBottom: 20
          }}
        />
        <ActivityIndicator
          size="small"
          color="#000"
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    authenticated: getAuthenticated(state),
    serverSocketConnected: getServerSocketConnected(state)
  };
}

export default connect(mapStateToProps, { authenticate, triggerServerConnection })(AuthLoadingScreen);
