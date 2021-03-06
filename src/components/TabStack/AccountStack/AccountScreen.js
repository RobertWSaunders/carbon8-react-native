import { StyleSheet, ScrollView, View, RefreshControl, TouchableHighlight, Image, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ListItem } from "react-native-elements";
import Config from "react-native-config";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { selectors, actionCreators } from "../../../ClientStore";

const { triggerServerDisconnection, unauthenticate, setUser } = actionCreators;
const { getUser } = selectors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF1F4"
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
    title: "Pricing Plans",
    topDivider: true,
    bottomDivider: false,
    navigateScreen: "PricingPlans"
  },
  {
    title: "Website",
    topDivider: true,
    bottomDivider: true,
    navigateScreen: "Website"
  }
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

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }

  async onRefresh() {
    this.setState({ refreshing: true });

    await this.fetchUserData();
  }

  async fetchUserData() {
    try {
      const accessToken = await AsyncStorage.getItem(Config.APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY);

      const res = await axios.get(`${Config.CARBON8_SERVER_URL}/api/users/${this.props.user.id}`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

      const { user } = res.data;

      this.props.setUser(user);

      this.setState({ refreshing: false });
    } catch (err) {
      this.setState({ refreshing: false });
    }
  }

  handleLogout() {
    this.props.triggerServerDisconnection();

    this.props.unauthenticate();

    AsyncStorage.removeItem(Config.APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY);

    this.props.navigation.navigate("Auth");
  }

  render() {
    const { firstName, lastName, subscribed } = this.props.user;

    const initials = firstName.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase();

    const subtitle = (subscribed) ? "Premium" : "Standard";

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
            tintColor="#000"
          />
        }
      >
        <View style={{
          marginTop: (this.state.refreshing) ? 0 : 20
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
      </ScrollView>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    user: getUser(state)
  };
}

export default connect(
  mapStateToProps,
  {
    triggerServerDisconnection,
    unauthenticate,
    setUser
  })(AccountScreen);
