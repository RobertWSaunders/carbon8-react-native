import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import React, { Component } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff1f4"
  }
});

const preferences = [
  {
    title: "Live Progress Modal",
    topDivider: true,
    bottomDivider: true,
    navigateScreen: "About"
  }
];

class PreferencesScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Preferences"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{
          marginTop: 20
        }}>
          {
            preferences.map((l, i) => (
              <ListItem
                key={i}
                title={l.title}
                titleStyle={{
                  fontSize: 15
                }}
                topDivider={l.topDivider}
                bottomDivider={l.bottomDivider}
                switch={{
                  value: true
                }}
              />
            ))
          }
        </View>
      </View>
    );
  }
}

export default PreferencesScreen;