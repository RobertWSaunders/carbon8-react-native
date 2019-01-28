import { Text, View, Button } from "react-native";
import React, { Component } from "react";

class AuthLoadingScreen extends Component {

  testButton() {
    console.log("THing");
    this.props.navigation.navigate("App");
  }

  render() {
    return (
      <View>
        <Text>Auth Loading</Text>
        <Button
          onPress={this.testButton.bind(this)}
          title="Fire Redux Action"
        />
      </View>
    )
  }
}

export default AuthLoadingScreen;