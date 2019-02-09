import { KeyboardAvoidingView, StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import { Input, Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import React, { Component } from "react";
import Config from "react-native-config";
import { connect } from "react-redux";
import axios from "axios";

import { selectors, actionCreators } from "../../ClientStore";

const { getServerSocketConnected, getAuthenticated } = selectors;
const { triggerServerConnection, authenticate } = actionCreators;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40
  }
});

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Login",
      header: null
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      loginLoading: false,
      loginButtonDisabled: false,

      signupButtonDisabled: false,

      resetButtonDisabled: false,

      formEmailAddress: "",
      formEmailAddressEditable: true,
      formEmailAddressErrorMessage: "",

      formPassword: "",
      formPasswordEditable: true,
      formPasswordErrorMessage: "",

      formErrorMessage: ""
    };
  }

  startLoginHandling() {
    this.setState({
      loginLoading: true,
      loginButtonDisabled: true,
      signupButtonDisabled: true,
      resetButtonDisabled: true,
      formPasswordEditable: false,
      formEmailAddressEditable: false
    });
  }

  stopLoginHandling(formErrorMessage) {
    this.setState({
      loginLoading: false,
      loginButtonDisabled: false,
      signupButtonDisabled: false,
      resetButtonDisabled: false,
      formEmailAddressEditable: true,
      formPasswordEditable: true,
      formErrorMessage
    });
  }

  stopValidatingInputs(passwordMsg, emailMsg) {
    this.setState({
      formPasswordErrorMessage: passwordMsg,
      formEmailAddressErrorMessage: emailMsg
    });
  }

  validateFormFields() {
    const { formEmailAddress, formPassword } = this.state;

    let status = true;
    const messages = {
      passwordMsg: "",
      emailMsg: ""
    };

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

    this.stopValidatingInputs(messages.passwordMsg, messages.emailMsg)

    return status;
  }

  async handleLogin() {
    this.startLoginHandling();

    if(!this.validateFormFields()) {
      return this.stopLoginHandling();
    };

    const { formEmailAddress, formPassword } = this.state;

    try {
      const res = await axios.post(`${Config.CARBON8_SERVER_URL}/auth/session`, {
        email: formEmailAddress,
        password: formPassword
      });

      const { user, appSessionId, scanCode, appAccessToken } = res.data;

      this.props.authenticate({
        user,
        scanCode,
        appSessionId
      });

      await AsyncStorage.setItem(Config.APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY, appAccessToken);

      this.props.triggerServerConnection();

      this.stopLoginHandling();
    } catch(err) {
      this.stopLoginHandling("The credentials provided are invalid.");
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
          textAlign: "center"
        }}>
          Welcome. Please login to your account.
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
      formEmailAddressEditable,
      formPasswordEditable
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
      </View>
    )
  }

  renderButtons() {
    const {
      loginLoading,
      loginButtonDisabled,
      signupButtonDisabled
    } = this.state;

    return (
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
      }}>
        <Button
          title="Login"
          buttonStyle={{
            width: 120,
            marginRight: 10,
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
          onPress={this.handleLogin.bind(this)}
          loading={loginLoading}
          disabled={loginButtonDisabled}
        />
        <Button
          title="Signup"
          type="outline"
          buttonStyle={{
            width: 120,
            marginLeft: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#000"
          }}
          titleStyle={{
            fontSize: 15,
            color: "#000"
          }}
          onPress={() => this.props.navigation.navigate("Signup")}
          disabled={signupButtonDisabled}
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
                this.props.navigation.navigate("Reset")
              }
            }}
            >
              &nbsp;Get a reset link.
            </Text>
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
        {this.renderResetPasswordText()}
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

export default connect(mapStateToProps, { authenticate, triggerServerConnection })(LoginScreen);
