import Barcode from 'react-native-barcode-builder';
import { StyleSheet, View, Button  } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";

import { selectors } from "../../ClientStore";

const { getScanCode } = selectors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ScanModal extends Component {

  render() {
    const { scanCode } = this.props;

    return (
      <View style={styles.container}>
        <Barcode
          value={scanCode}
          format="CODE128"
          text={scanCode}
          width={1}
          background="#FFF"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
          color="#000"
        />
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    scanCode: getScanCode(state)
  }
}

export default connect(mapStateToProps)(ScanModal);
