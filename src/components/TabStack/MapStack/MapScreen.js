import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { ListItem } from "react-native-elements";
import React, { Component } from "react";
import MapView from "react-native-maps";

const styles = StyleSheet.create({
  map: {
    top: 0,
    height: 400,
    width: "100%"
  }
});

const list = [
  {
    title: "Robert's Personal Fountain",
    topDivider: true,
    bottomDivider: true,
    navigateScreen: "About"
  }
];

class MapScreen extends Component {
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
      )
    };
  };

  render() {
    return (
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
        <View style={{
          width: "100%"
        }}>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                title={l.title}
                titleStyle={{
                  fontSize: 15
                }}
                topDivider={l.topDivider}
                bottomDivider={l.bottomDivider}
                chevron={true}
                onPress={() => this.props.navigation.navigate(l.navigateScreen)}
                badge={{ value: "300m" }}
              />
            ))
          }
        </View>
      </View>
    );
  }
}

export default MapScreen;
