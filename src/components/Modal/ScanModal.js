import { StyleSheet, View, Text } from "react-native";
import { Header } from "react-native-elements";
import QRCode from "react-native-qrcode-svg";
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
          Scan your code at any Carbon8 fountain to access sparkling water and log your consumption in the app.
        </Text>
        <View
          style={{
            alignItems: "center"
          }}
        >
          <QRCode
            value={scanCode}
            size={180}
          />
        </View>
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
