import { KeyboardAvoidingView, StyleSheet, Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Input, Button } from "react-native-elements";
import Config from "react-native-config";
import React, { Component } from "react";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "40%",
    marginBottom: 40
  }
});

class ResetScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetLoading: false,
      resetButtonDisabled: false,

      formEmailAddress: "",
      formEmailAddressEditable: true,
      formEmailAddressErrorMessage: "",

      formErrorMessage: "",
      formSuccessMessage: ""
    };
  }

  startResetPasswordHandling() {
    this.setState({
      resetLoading: true,
      resetButtonDisabled: true,
      formEmailAddressEditable: false
    });
  }

  stopResetPasswordHandling(formErrorMessage, formSuccessMessage) {
    this.setState({
      resetLoading: false,
      resetButtonDisabled: false,
      formEmailAddressEditable: true,
      formEmailAddress: "",
      formErrorMessage,
      formSuccessMessage
    });
  }

  stopValidatingInputs(emailMsg) {
    this.setState({
      formEmailAddressErrorMessage: emailMsg
    });
  }

  validateFormFields() {
    const { formEmailAddress } = this.state;

    let emailMsg = "";
    let status = true;

    if (!/^.+@.+$/.test(formEmailAddress)) {
      status = false;
      emailMsg = "Please enter a valid email.";
    }

    this.stopValidatingInputs(emailMsg);

    return status;
  }

  async handleResetPassword() {
    this.startResetPasswordHandling();

    if (!this.validateFormFields()) {
      return this.stopResetPasswordHandling();
    }

    const { formEmailAddress } = this.state;

    try {
      const res = await axios.post(`${Config.CARBON8_SERVER_URL}/auth/createResetHash`, {
        email: formEmailAddress
      });

      this.stopResetPasswordHandling("", "Successfully sent your reset link.");
    } catch (err) {
      this.stopResetPasswordHandling("Could not send your reset link, please try again.", "");
    }
  }

  renderLogoContainer() {
    const {
      formErrorMessage,
      formSuccessMessage
    } = this.state;

    return (
      <View style={{
        alignItems: "center"
      }}>
        <Image
          source={require("../../assets/carbon8WordmarkLogoBlack.png")}
          style={{
            width: 170,
            height: 40,
            resizeMode: "contain",
            marginBottom: 30
          }}
        />
        <Text style={{
          fontSize: 15,
          marginBottom: 30,
          marginLeft: 30,
          marginRight: 30,
          textAlign: "center"
        }}>
          Oh no! {"It's"} easy to forget your password. Thankfully we can help you out. Enter your email below and we will send you a link to reset your password.
          {(formErrorMessage || formSuccessMessage) ? (
            <Text style={{
              color: (formSuccessMessage) ? "#44bd32" : "#fa291f",
              fontSize: 14
            }}>
              {"\n"}{"\n"}{formErrorMessage}{formSuccessMessage}
            </Text>
          ) : (
            null
          )}
        </Text>
      </View>
    );
  }

  renderFormInputs() {
    const {
      formEmailAddressErrorMessage,
      formEmailAddressEditable
    } = this.state;

    return (
      <View style={{
        alignItems: "center",
        marginBottom: 30
      }}>
        <Input
          placeholder="Enter your email address"
          placeholderTextColor="#4a4a4a"
          keyboardType="email-address"
          textContentType="username"
          autoCapitalize="none"
          errorMessage={formEmailAddressErrorMessage}
          editable={formEmailAddressEditable}
          leftIcon={
            <Icon
              name="ios-mail"
              size={24}
              color="black"
            />
          }
          leftIconContainerStyle={{
            width: 20,
            marginLeft: 10,
            marginRight: 10
          }}
          inputContainerStyle={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#000",
            width: "75%"
          }}
          inputStyle={{
            fontSize: 15
          }}
          onChangeText={(formEmailAddress) => this.setState({ formEmailAddress })}
        />
      </View>
    );
  }

  renderButtons() {
    const {
      resetLoading,
      resetButtonDisabled
    } = this.state;

    return (
      <View style={{
        flexDirection: "row",
        justifyContent: "center"
      }}>
        <Button
          title="Send Reset Link"
          buttonStyle={{
            width: 160,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#000",
            backgroundColor: "#000"
          }}
          disabledStyle={{
            backgroundColor: "#000"
          }}
          titleStyle={{
            fontSize: 15
          }}
          onPress={this.handleResetPassword.bind(this)}
          loading={resetLoading}
          disabled={resetButtonDisabled}
        />
      </View>
    );
  }

  renderResetPasswordText() {
    const { resetButtonDisabled } = this.state;

    return (
      <View style={{
        position: 'absolute',
        bottom: 0
      }}>
        <Text style={{
          color: "#4a4a4a",
          textAlign: "center"
        }}>
          Forgot your password?
          <Text style={{
            color: "#000"
          }}
          onPress={() => {
            if (!resetButtonDisabled) {
              this.props.navigation.navigate("Reset");
            }
          }}
          >
            &nbsp;Get a reset link.
          </Text>
        </Text>
      </View>
    );
  }

  render() {
    const { authenticated, serverSocketConnected } = this.props;

    if (authenticated && serverSocketConnected) {
      setTimeout(() => this.props.navigation.navigate('App'));
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {this.renderLogoContainer()}
        {this.renderFormInputs()}
        {this.renderButtons()}
      </KeyboardAvoidingView>
    );
  }
}

export default ResetScreen;
