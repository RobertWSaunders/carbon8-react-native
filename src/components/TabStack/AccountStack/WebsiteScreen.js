import { StyleSheet, View, ActivityIndicator } from "react-native";
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
    };
  };

  render() {
    const sourceUri = this.props.navigation.getParam("sourceUri", "https://carbon8water.com");

    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: sourceUri }}
          startInLoadingState={true}
          renderLoading={() => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator
                size="small"
                color="#000"
              />
            </View>
          )}
        />
      </View>
    );
  }
}

export default WebsiteScreen;
