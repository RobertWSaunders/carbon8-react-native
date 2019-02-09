import { StyleSheet, View, Text } from "react-native";
import React, { Component } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class PricingPlansScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Pricing Plans"
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Pricing Plans</Text>
      </View>
    );
  }
}

export default PricingPlansScreen;
