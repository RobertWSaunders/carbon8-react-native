import { StyleSheet, View, Text } from "react-native";
import { Header, ButtonGroup } from "react-native-elements";
import React, { Component } from "react";

class LogModal extends Component {

  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
      title: "Add Hydration Goal"
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    switch (selectedIndex) {
      case 0:
        console.log(selectedIndex);
        this.setState({
          selectedIndex,
          title: "Add Hydration Goal"
        });
        break;
      case 1:
        this.setState({
          selectedIndex,
          title: "Add Manual Log"
        });
        break;
    }
  }

  render() {
    const { selectedIndex, title } = this.state

    const buttons = ["Add Hydration Goal", "Add Manual Log"]

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
                fontSize: 16,
              }}>Close</Text>
          )}
          centerComponent={(
            <Text style={{
              fontSize: 17,
              fontWeight: "600"
            }}>{title}</Text>
          )}
        />
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{
            top: 5,
            left: 0,
            right: 0,
            margin: 0,
            height: 50 
          }}
          textStyle={{
            fontSize: 16,
            color: "#000",
            borderColor: "#000"
          }}
          selectedTextStyle={{
            color: "#FFF"
          }}
          selectedButtonStyle={{
            backgroundColor: "#000"
          }}
        />
      </View>
    )
  }
}

export default LogModal;
