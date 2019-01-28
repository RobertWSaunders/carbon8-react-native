import { StyleSheet, View, Button } from 'react-native';
import React, { Component } from 'react';
import { connect } from "react-redux";

import { actionCreators, selectors } from "../ClientStore";

const { authenticated } = actionCreators;
const { getIsAuthenticated } = selectors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Carbon8',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  fireReduxAction() {
    this.props.authenticated();
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <View style={styles.container}>
        <Button
          onPress={this.fireReduxAction.bind(this)}
          title="Fire Redux Action"
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    isAuthenticated: getIsAuthenticated(state)
  }
}

export default connect(mapStateToProps, { authenticated })(HomeScreen);