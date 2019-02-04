import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import React, { Component } from "react";
import MapView from "react-native-maps";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  map: {
    top: 0,
    height: "65%",
    width: "100%"
  },
  list: {
    flex: 1
  }
});

class MapScreen extends Component {
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
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <View style={styles.list}>
          <Text>Map of fountains!</Text>
        </View>
      </View>
    )
  }
}

export default MapScreen;