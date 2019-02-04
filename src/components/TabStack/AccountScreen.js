import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import React, { Component } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class AccountScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Image
          source={require('../../assets/carbon8WordmarkLogoBlack.png')}
          style={{ width: 110, height: 25, marginBottom: 5 }}
        />
      ),
      headerRight: (
        <TouchableHighlight onPress={() => navigation.navigate("ScanModal")}>
          <Icon
            name="ios-barcode"
            size={30}
            color="#000"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("ScanModal")}
          />
        </TouchableHighlight>
      )
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Account</Text>
      </View>
    )
  }
}

export default AccountScreen;