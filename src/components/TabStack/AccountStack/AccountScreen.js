import { StyleSheet, View, TouchableHighlight, Image, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ListItem } from "react-native-elements";
import React, { Component } from "react";
import { connect } from "react-redux";

import { selectors, actionCreators, APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../../ClientStore";

const { triggerServerDisconnection, unauthenticate } = actionCreators;
const { getUser } = selectors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff1f4"
  }
});

const list = [
  {
    title: "About",
    topDivider: true,
    bottomDivider: false,
    navigateScreen: "About"
  },
  {
    title: "Preferences",
    topDivider: true,
    bottomDivider: false,
    navigateScreen: "Preferences"
  },
  {
    title: "Website",
    topDivider: true,
    bottomDivider: true,
    navigateScreen: "Website"
  },
];

class AccountScreen extends Component {
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

  handleLogout() {
    this.props.triggerServerDisconnection();

    this.props.unauthenticate();

    AsyncStorage.removeItem(APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY);

    this.props.navigation.navigate("Auth");
  }

  render() {
    const { firstName, lastName, subscribed } = this.props.user;

    const initials = firstName.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase();

    const subtitle = (subscribed) ? "Premium" : "Standard";

    return (
      <View style={styles.container}>
        <View style={{
          marginTop: 20
        }}>
          <ListItem
            key={5}
            leftAvatar={{ title: initials }}
            title={`${firstName} ${lastName}`}
            titleStyle={{
              fontSize: 16
            }}
            subtitleStyle={{
              fontSize: 14
            }}
            subtitle={subtitle}
            topDivider={true}
            bottomDivider={true}
          />
        </View>
        <View style={{
          marginTop: 20
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
              />
            ))
          }
        </View>
        <View style={{
          marginTop: 20
        }}>
          <ListItem
            key={4}
            title="Logout"
            titleStyle={{
              color: "#fa291f",
              fontSize: 15
            }}
            topDivider={true}
            bottomDivider={true}
            onPress={this.handleLogout.bind(this)}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    user: getUser(state)
  }
}

export default connect(mapStateToProps, { triggerServerDisconnection, unauthenticate })(AccountScreen);
