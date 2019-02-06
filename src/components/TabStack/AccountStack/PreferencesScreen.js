import { StyleSheet, View, Text } from 'react-native';
import React, { Component } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class PreferencesScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Preferences"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Preferences</Text>
      </View>
    );
  }
}

export default PreferencesScreen;