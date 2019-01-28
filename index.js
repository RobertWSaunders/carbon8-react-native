import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { Provider } from "react-redux";

import { name as appName } from './app.json';
import { getStore } from "./src/ClientStore";
import App from "./src/components/App";

class Client extends Component {
  render() {
    return (
      <Provider store={getStore()}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Client);
