import { StyleSheet, Text, View, Button } from 'react-native';
import React, { Component } from 'react';
import { connect } from "react-redux";

import { actionCreators, selectors } from "../ClientStore";

const { authenticated } = actionCreators;
const { getIsAuthenticated } = selectors;

class Test extends Component {

  fireReduxAction() {
    this.props.authenticated();
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <View style={styles.container}>
        <Text>Welcome to Carbon8! {isAuthenticated}</Text>
        <Button
          onPress={this.fireReduxAction.bind(this)}
          title="Fire Redux Action"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    isAuthenticated: getIsAuthenticated(state)
  }
}

export default connect(mapStateToProps, { authenticated })(Test);