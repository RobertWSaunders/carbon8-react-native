import { StyleSheet, View, Text, AsyncStorage } from "react-native";
import { Header } from "react-native-elements";
import QRCode from "react-native-qrcode-svg";
import Config from "react-native-config";
import React, { Component } from "react";
import Emoji from "react-native-emoji";
import { connect } from "react-redux";
import axios from "axios";

import { selectors, actionCreators } from "../../ClientStore";

const { setScanCode } = actionCreators;

const {
  getScanCode,
  getAppSessionId,
  getDispensingFlatWater,
  getDispensingSparklingWater,
  getFetchNewScanCodeForSession
} = selectors;

class ScanModal extends Component {

  async componentDidUpdate(prevProps) {
    const { fetchNewScanCodeForSession } = this.props;

    if (fetchNewScanCodeForSession && (fetchNewScanCodeForSession !== prevProps.fetchNewScanCodeForSession)) {
      await this.fetchNewScanCodeForSession();
    }
  }

  async fetchNewScanCodeForSession() {
    try {
      const accessToken = await AsyncStorage.getItem(Config.APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY);

      const res = await axios.get(`${Config.CARBON8_SERVER_URL}/api/auth/getNewScanCodeForSession`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

      const { scanCode } = res.data;

      this.props.setScanCode(scanCode);
    } catch (err) {
      console.log(err);
    }
  }

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
        {(this.props.dispensingFlatWater) ? (
          <View style={{
            marginTop: 20
          }}>
            <Emoji
              style={{
                justifyContent: "center",
                textAlign: "center",
                fontSize: 100
              }}
              name={"rain_cloud"}
            />
            <Text
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                justifyContent: "center",
                textAlign: "center",
                fontSize: 15
              }}
            >
              You are currently dispensing flat water!
            </Text>
          </View>
        ) : (
          null
        )}
        {(this.props.dispensingSparklingWater) ? (
          <View style={{
            marginTop: 20
          }}>
            <Emoji
              style={{
                justifyContent: "center",
                textAlign: "center",
                fontSize: 100
              }}
              name={"sweat_drops"}
            />
            <Text
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                justifyContent: "center",
                textAlign: "center",
                fontSize: 15
              }}
            >
              You are currently dispensing sparkling water!
            </Text>
          </View>
        ) : (
          null
        )}
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    scanCode: getScanCode(state),
    appSessionId: getAppSessionId(state),
    dispensingFlatWater: getDispensingFlatWater(state),
    dispensingSparklingWater: getDispensingSparklingWater(state),
    fetchNewScanCodeForSession: getFetchNewScanCodeForSession(state)
  };
}

export default connect(mapStateToProps, { setScanCode })(ScanModal);
