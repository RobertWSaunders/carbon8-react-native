import { StyleSheet, View, Text } from 'react-native';
import React, { Component } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class WebsiteScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Website"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Website</Text>
      </View>
    );
  }
}

export default WebsiteScreen;