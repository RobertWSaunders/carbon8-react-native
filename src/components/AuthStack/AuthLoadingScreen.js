import { Text, View, Image, ActivityIndicator, AsyncStorage } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { selectors, actionCreators, APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../ClientStore";

const { getServerSocketConnected, getAuthenticated } = selectors;
const { triggerServerConnection, authenticate } = actionCreators;

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.bootstrapApplication();
  }

  async bootstrapApplication() {
    try {
      await AsyncStorage.setItem(APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNTk0YzNiYy0yNmU5LTRhZGUtOGZkNC1iNTc2NTMyMDc1YzYiLCJhcHBTZXNzaW9uSWQiOiJDOVVBIiwiaWF0IjoxNTQ5MzE0NzE5LCJleHAiOjE1NDkzMTUwMTksImlzcyI6IkNhcmJvbjgifQ.xwYuw8aA67LE26_VozI61KlWs2PJxci4mbUqZiDMHN8");

      const oldAccessToken = await AsyncStorage.getItem(APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY);

      if (oldAccessToken === null) {
        return this.props.navigation.navigate("Auth");
      }

      const res = await axios.get("http://localhost:3001/auth/sessionFromAccessToken", {
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

      await AsyncStorage.setItem(APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY, appAccessToken);

      this.props.triggerServerConnection();
    } catch(err) {
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
        <ActivityIndicator size="small" color="#000" />
      </View>
    )
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