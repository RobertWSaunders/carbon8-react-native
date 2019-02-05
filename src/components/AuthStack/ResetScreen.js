import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ResetScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Reset</Text>
      </View>
    )
  }
}

export default ResetScreen;