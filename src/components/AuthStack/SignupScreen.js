import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class SignupScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        border: 0
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Signup</Text>
      </View>
    )
  }
}

export default SignupScreen;