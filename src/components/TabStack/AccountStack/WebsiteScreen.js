import { StyleSheet, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import React, { Component } from "react";


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class WebsiteScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Carbon8 Website"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: "https://google.com" }}
        />
      </View>
    );
  }
}

export default WebsiteScreen;