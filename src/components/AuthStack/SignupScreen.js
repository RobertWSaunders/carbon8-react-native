import { KeyboardAvoidingView, StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Input, Button } from 'react-native-elements';
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { selectors, actionCreators, APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../ClientStore";

const { getServerSocketConnected, getAuthenticated } = selectors;
const { triggerServerConnection, authenticate } = actionCreators;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "28%",
    marginBottom: 40
  }
});

class SignupScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      signupButtonLoading: false,
      signupButtonDisabled: false,

      formFullName: "",
      formFullNameEditable: true,
      formFullNameErrorMessage: "",

      formEmailAddress: "",
      formEmailAddressEditable: true,
      formEmailAddressErrorMessage: "",

      formPassword: "",
      formPasswordEditable: true,
      formPasswordErrorMessage: "",

      formConfirmPassword: "",
      formConfirmPasswordEditable: true,
      formConfirmPasswordErrorMessage: "",

      termsButtonDisabled: false,
      privacyButtonDisabled: false,

      formErrorMessage: ""
    };
  }

  startSignupHandling() {
    this.setState({
      signupButtonLoading: true,
      signupButtonDisabled: true,
      formFullNameEditable: false,
      formEmailAddressEditable: false,
      formPasswordEditable: false,
      formConfirmPasswordEditable: false,
      termsButtonDisabled: true,
      privacyButtonDisabled: true
    });
  }

  stopSignupHandling(formErrorMessage) {
    this.setState({
      signupButtonLoading: false,
      signupButtonDisabled: false,
      formFullNameEditable: true,
      formEmailAddressEditable: true,
      formPasswordEditable: true,
      formConfirmPasswordEditable: true,
      termsButtonDisabled: false,
      privacyButtonDisabled: false,
      formErrorMessage
    });
  }

  stopValidatingInputs(nameMsg, emailMsg, passwordMsg, confirmMsg) {
    this.setState({
      formFullNameErrorMessage: nameMsg,
      formPasswordErrorMessage: passwordMsg,
      formConfirmPasswordErrorMessage: confirmMsg,
      formEmailAddressErrorMessage: emailMsg
    });
  }

  validateFormFields() {
    const { formEmailAddress, formPassword, formConfirmPassword, formFullName } = this.state;

    let status = true;
    let messages = {
      nameMsg: "",
      confirmMsg: "",
      passwordMsg: "",
      emailMsg: ""
    };

    if (formFullName.length === 0) {
      status = 0;
      messages.nameMsg = "Please enter your full name."
    }

    if (formPassword.length === 0) {
      status = false;
      messages.passwordMsg = "Please enter a password."
    }

    if (formPassword.length !== 0 && formPassword.length < 8) {
      status = false;
      messages.passwordMsg = "Please enter a valid password (min 8 chars)."
    }

    if (!/^.+@.+$/.test(formEmailAddress)) {
      status = false;
      messages.emailMsg = "Please enter a valid email."
    }

    if (formPassword.length !== 0 && formPassword.length > 7 && formConfirmPassword.length === 0) {
      status = false;
      messages.confirmMsg = "Please confirm your password."
    }

    if (formConfirmPassword.length !== 0 && formPassword !== formConfirmPassword) {
      status = false;
      messages.confirmMsg = "Passwords do not match."
    }

    this.stopValidatingInputs(messages.nameMsg, messages.emailMsg, messages.passwordMsg, messages.confirmMsg);

    return status;
  }

  async handleSignup() {
    this.startSignupHandling();

    if (!this.validateFormFields()) {
      return this.stopSignupHandling();
    };

    const { formEmailAddress, formPassword, formFullName } = this.state;

    const name = formFullName.split(" ");

    const firstName = name.slice(0, -1).join(" ");
    const lastName = name.slice(-1).join(" ");

    try {
      const res = await axios.post("http://localhost:3001/auth/signup", {
        firstName,
        lastName,
        email: formEmailAddress,
        password: formPassword
      });

      const { user, appSessionId, scanCode, appAccessToken } = res.data;

      this.props.authenticate({
        user,
        scanCode,
        appSessionId
      });

      await AsyncStorage.setItem(APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY, appAccessToken);

      this.props.triggerServerConnection();

      this.stopSignupHandling();
    } catch (err) {
      this.stopSignupHandling("Could not create account at this time.");
    }
  }

  renderLogoContainer() {
    const { formErrorMessage } = this.state;

    return (
      <View style={{
        alignItems: "center",
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
          textAlign: "center",
        }}>
          A more hydrated you starts here.
        {(formErrorMessage) ? (
            <Text style={{
              color: "#fa291f",
              fontSize: 14,
            }}>
              {"\n"}{"\n"}{formErrorMessage}
          </Text>
          ) : (
              null
            )}
        </Text>
      </View>
    )
  }

  renderFormInputs() {
    const {
      formEmailAddressErrorMessage,
      formPasswordErrorMessage,
      formFullNameErrorMessage,
      formConfirmPasswordErrorMessage,
      formFullNameEditable,
      formEmailAddressEditable,
      formPasswordEditable,
      formConfirmPasswordEditable
    } = this.state;

    return (
      <View style={{
        alignItems: "center",
        marginBottom: 30
      }}>
        <Input
          placeholder="Enter your full name"
          placeholderTextColor="#4a4a4a"
          keyboardType="email-address"
          textContentType="username"
          autoCapitalize="none"
          errorMessage={formFullNameErrorMessage}
          editable={formFullNameEditable}
          leftIcon={
            <Icon
              name="ios-contact"
              size={24}
              color="black"
            />
          }
          leftIconContainerStyle={{
            width: 20,
            marginLeft: 10,
            marginRight: 10
          }}
          containerStyle={{
            marginBottom: 15,
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
          onChangeText={(formFullName) => this.setState({ formFullName })}
        />
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
          containerStyle={{
            marginBottom: 15,
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
        <Input
          placeholder="Enter your password"
          placeholderTextColor="#4a4a4a"
          textContentType="password"
          editable={formPasswordEditable}
          errorMessage={formPasswordErrorMessage}
          secureTextEntry={true}
          multiline={false}
          autoCapitalize="none"
          leftIcon={
            <Icon
              name="ios-lock"
              size={24}
              color="black"
            />
          }
          leftIconContainerStyle={{
            width: 20,
            marginLeft: 10,
            marginRight: 10
          }}
          containerStyle={{
            marginBottom: 15,
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
          onChangeText={(formPassword) => this.setState({ formPassword })}
        />
        <Input
          placeholder="Confirm your password"
          placeholderTextColor="#4a4a4a"
          textContentType="password"
          editable={formConfirmPasswordEditable}
          errorMessage={formConfirmPasswordErrorMessage}
          secureTextEntry={true}
          multiline={false}
          autoCapitalize="none"
          leftIcon={
            <Icon
              name="ios-lock"
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
          onChangeText={(formConfirmPassword) => this.setState({ formConfirmPassword })}
        />
      </View>
    )
  }

  renderButtons() {
    const {
      signupLoading,
      signupButtonDisabled 
    } = this.state;

    return (
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
      }}>
        <Button
          title="Signup"
          buttonStyle={{
            width: 120,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#000",
            backgroundColor: "#000",
          }}
          disabledStyle={{
            backgroundColor: "#000"
          }}
          titleStyle={{
            fontSize: 15
          }}
          onPress={this.handleSignup.bind(this)}
          loading={signupLoading}
          disabled={signupButtonDisabled}
        />
      </View>
    );
  }

  renderTermsAndPrivacyText() {
    const { 
      termsButtonDisabled,
      privacyButtonDisabled
    } = this.state;

    return (
      <View style={{
        position: "absolute",
        bottom: 0
      }}>
        <Text style={{
          color: "#4a4a4a",
          textAlign: "center"
        }}>
          By signing up you agree to our 
            <Text style={{
              color: "#000"
            }}
            onPress={() => {
              if (!termsButtonDisabled) {
                this.props.navigation.navigate("Reset")
              }
            }}
          >
            &nbsp;Terms of Service
            </Text>
          &nbsp;and&nbsp;
             <Text style={{
              color: "#000"
            }}
            onPress={() => {
              if (!privacyButtonDisabled) {
                this.props.navigation.navigate("Reset")
              }
            }}
          >
            Privacy Policy
            </Text>
            .
        </Text>
      </View>
    )
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
        {this.renderTermsAndPrivacyText()}
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    authenticated: getAuthenticated(state),
    serverSocketConnected: getServerSocketConnected(state)
  };
}

export default connect(mapStateToProps, { authenticate, triggerServerConnection })(SignupScreen);