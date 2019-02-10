import { StyleSheet, View, Text } from "react-native";
import Barcode from 'react-native-barcode-builder';
import { Header } from "react-native-elements";
import React, { Component } from "react";
import { connect } from "react-redux";

import { selectors } from "../../ClientStore";

const { getScanCode } = selectors;

class ScanModal extends Component {

  render() {
    const { scanCode } = this.props;

    return (
      <View>
        <Header
          backgroundColor="#fff"
          containerStyle={{
            borderBottomColor: "#A7A7AA",
            borderBottomWidth: StyleSheet.hairlineWidth
          }}
          leftComponent={(
            <Text
              onPress={() => this.props.navigation.goBack()}
              style={{
                fontSize: 16
              }}
            >
              Close
            </Text>
          )}
          centerComponent={(
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600"
              }}
            >
              Scan Code
            </Text>
          )}
        />
        <Text
          style={{
            marginTop: 80,
            marginBottom: 80,
            paddingRight: 50,
            paddingLeft: 50,
            justifyContent: "center",
            textAlign: "center",
            fontSize: 15
          }}
        >
          Scan your barcode at any Carbon8 fountain to access sparkling water and log your consumption in the app.
        </Text>
        <Barcode
          value={scanCode}
          format="CODE128"
          text={scanCode}
          width={1}
          background="#FFF"
        />
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    scanCode: getScanCode(state)
  };
}

export default connect(mapStateToProps)(ScanModal);
