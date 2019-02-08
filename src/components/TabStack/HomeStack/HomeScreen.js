import { StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Card, Divider } from "react-native-elements";
import React, { Component } from 'react';

class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Image
          source={require('../../../assets/carbon8WordmarkLogoBlack.png')}
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
      ),
      headerLeft: (
        <TouchableHighlight onPress={() => navigation.navigate("LogModal")}>
          <Icon
            name="ios-add-circle-outline"
            size={30}
            color="#000"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.navigate("LogModal")}
          />
        </TouchableHighlight>
      )
    };
  };

  render() {
    return (
      <View>
        <Card title="Today's Intake">
          <View>
            <Text>Bob</Text>
          </View>
        </Card>
        <Divider style={{ backgroundColor: "#000", marginTop: 20 }} />
      </View>
    );
  }
}

export default HomeScreen;
