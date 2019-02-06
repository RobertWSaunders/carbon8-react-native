import { StyleSheet, View, Text } from 'react-native';
import React, { Component } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class AboutScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "About"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>About</Text>
      </View>
    );
  }
}

export default AboutScreen;