import { StyleSheet, View, Text } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import React, { Component } from 'react';
import { connect } from "react-redux";

import { selectors } from "../../ClientStore";

const { getScanCode, getTest } = selectors;

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
    title: 'Carbon8'
  };

  render() {
    const { scanCode, test } = this.props;

    return (
      <View style={styles.container}>
        <Barcode 
          value={scanCode}
          format="CODE128"
          text={scanCode}
          width={1}
          background="#F5FCFF"
        />
        <Text>{test}</Text>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    scanCode: getScanCode(state),
    test: getTest(state)
  }
}

export default connect(mapStateToProps)(HomeScreen);