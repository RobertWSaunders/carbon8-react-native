import { KeyboardAvoidingView, StyleSheet, Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Input, Button } from 'react-native-elements';
import React, { Component } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60
  }
});

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
      }
    }

  renderLogoContainer() {
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
          marginBottom: 30
        }}>
          Welcome. Please login to your account.
        </Text>
      </View>
    )
  }

  renderFormInputs() {
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
        />
        <Input
          placeholder="Enter your password"
          placeholderTextColor="#4a4a4a"
          textContentType="password"
          secureTextEntry={true}
          multiline={false} 
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
            marginRight: 30,
            marginLeft: 30,
            width: "75%"
          }}
          inputStyle={{
            fontSize: 15
          }}
        />
      </View>
    )
  }

  renderButtons() {
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
          titleStyle={{
            fontSize: 15
          }}
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
        />
      </View>
    );
  }

  renderResetPasswordText() {
    return (
      <View style={{
        position: 'absolute',
        bottom: 0
      }}>
        <Text style={{
          color: "#4a4a4a"
        }}>
          Forgot your password?
            <Text style={{
              color: "#000"
            }}
            onPress={() => this.props.navigation.navigate("Reset")}
            >
              &nbsp;Get a reset link.
            </Text>
        </Text>
      </View>
    )
  }

  render() {
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

export default LoginScreen;