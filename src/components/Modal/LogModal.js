import { StyleSheet, View, Text, TouchableHighlight, Picker } from "react-native";
import { Header, ButtonGroup, ListItem, Button, Overlay, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import React, { Component } from "react";

const possibleIntakeWaterTypes = [
  "Flat Water",
  "Sparkling Water"
];

const possibleGoalTypes = [
  "Daily",
  "Weekly",
  "Monthly",
  "Date Deadline"
];

const intakeAmountSelectOptions = [];

for (let i = 5; i < 3000; i = i + 5) {
  intakeAmountSelectOptions.push(i);
}

class LogModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalTitle: "Add Hydration Goal",

      buttonGroupSelectedIndex: 0,

      goalName: "",
      selectedGoalType: "Daily",
      selectedIntakeGoal: "10",
      selectedGoalDeadline: new Date(),

      selectedIntakeAmount: "5",
      selectedIntakeDate: new Date(),
      selectedIntakeWaterType: "Flat Water",

      saveButtonDisabled: false,

      infoOverlayVisible: false
    };
  }

  updateIndex(selectedIndex) {
    switch (selectedIndex) {
      case 0:
        this.setState({
          buttonGroupSelectedIndex: selectedIndex,
          modalTitle: "Add Hydration Goal"
        });
        break;
      case 1:
        this.setState({
          buttonGroupSelectedIndex: selectedIndex,
          modalTitle: "Add Intake Log"
        });
        break;
    }
  }

  renderHeader() {
    const { modalTitle } = this.state;

    return (
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
            {modalTitle}
          </Text>
        )}
        rightComponent={(
          <TouchableHighlight onPress={() => navigation.navigate("ScanModal")}>
            <Icon
              name="ios-information-circle-outline"
              size={30}
              color="#000"
              onPress={() => navigation.navigate("ScanModal")}
            />
          </TouchableHighlight>
        )}
      />
    );
  }

  renderButtonGroup() {
    const { buttonGroupSelectedIndex } = this.state;

    const buttons = ["Hydration Goal", "Intake Log"];

    return (
      <ButtonGroup
        onPress={this.updateIndex.bind(this)}
        selectedIndex={buttonGroupSelectedIndex}
        buttons={buttons}
        containerBorderRadius={0}
        containerStyle={{
          height: 35,
          borderColor: "#000",
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 20,
          borderRadius: 0,
          borderRightWidth: 0,
          borderLeftWidth: 0
        }}
        innerBorderStyle={{
          borderColor: "#000"
        }}
        textStyle={{
          fontSize: 15,
          color: "#000",
          borderColor: "#000",
          fontWeight: "normal"
        }}
        selectedTextStyle={{
          color: "#FFF"
        }}
        selectedButtonStyle={{
          backgroundColor: "#000"
        }}
      />
    );
  }

  renderHydrationGoalForm() {
    return (
      <View>
        <ListItem
          title={"Goal Name"}
          input={{
            inputStyle: {
              fontSize: 15
            },
            placeholder: "My Awesome Goal"
          }}
          titleStyle={{
            fontSize: 15
          }}
          topDivider={true}
          bottomDivider={true}
        />
        <ListItem
          title={"Goal Type"}
          titleStyle={{
            fontSize: 15
          }}
          topDivider={false}
          bottomDivider={true}
          onPress={() => this.setState({ isVisible: true })}
        />
        <ListItem
          title={"Intake Goal"}
          titleStyle={{
            fontSize: 15
          }}
          topDivider={false}
          bottomDivider={true}
        />
        <ListItem
          title={"Goal Deadline Date"}
          titleStyle={{
            fontSize: 15
          }}
          topDivider={false}
          bottomDivider={true}
        />
      </View>
    );
  }

  renderManualLogForm() {
    return (
      <View>
        <ListItem
          title={"Intake Amount"}
          titleStyle={{
            fontSize: 15
          }}
          topDivider={true}
          bottomDivider={true}
        />
        <ListItem
          title={"Intake Water Type"}
          titleStyle={{
            fontSize: 15
          }}
          topDivider={false}
          bottomDivider={true}
        />
        <ListItem
          title={"Intake Date"}
          titleStyle={{
            fontSize: 15
          }}
          topDivider={false}
          bottomDivider={true}
        />
      </View>
    );
  }

  renderSaveButton() {
    const { buttonGroupSelectedIndex, saveButtonDisabled } = this.state;

    return (
      <View
        style={{
          height: 100,
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderColor: "#A7A7AA",
          borderWidth: StyleSheet.hairlineWidth,
          bottom: 0,
          position: "absolute"
        }}
      >
        <Button
          title={(buttonGroupSelectedIndex === 0) ? "Save Hydration Goal" : "Save Intake Log"}
          buttonStyle={{
            marginTop: 20,
            marginRight: 20,
            marginLeft: 20,
            borderWidth: 1,
            borderColor: "#000",
            backgroundColor: "#000"
          }}
          titleStyle={{
            color: "#FFFFFF",
            fontSize: 15
          }}
          disabled={saveButtonDisabled}
          disabledStyle={{
            borderWidth: 0,
            backgroundColor: "#B2B2B2"
          }}
          disabledTitleStyle={{
            color: "#FFFFFF"
          }}
        />
      </View>
    );
  }

  render() {
    const { buttonGroupSelectedIndex } = this.state;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#EFF1F4"
        }}
      >
        {this.renderHeader()}
        {this.renderButtonGroup()}
        {(buttonGroupSelectedIndex === 0) ? (
          this.renderHydrationGoalForm()
        ) : (
          this.renderManualLogForm()
        )}
        {this.renderSaveButton()}
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          width={"75%"}
          height={200}
          overlayStyle={{
            margin: 0,
            padding: 0
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                margin: 15
              }}
            >
              Select Goal Type
            </Text>
            <Divider style={{ backgroundColor: "#000", height: 1 }} />
            <Picker
              selectedValue={this.state.language}
              style={{ width: "100%"}}
              itemStyle={{
                height: 121,
                fontSize: 17,
                color: "#000"
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }>
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Date Deadline" value="deadline" />
            </Picker>
            <Button
              title="OK"
              buttonStyle={{
                bottom: 0,
                width: "100%",
                borderWidth: 1,
                borderColor: "#000",
                backgroundColor: "#000"
              }}
              titleStyle={{
                fontSize: 15
              }}
              onPress={() => this.setState({ isVisible: false })}
            />
          </View>
        </Overlay>
      </View>
    );
  }
}

export default LogModal;
