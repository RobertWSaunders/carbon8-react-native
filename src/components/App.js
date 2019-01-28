import React, { Component } from 'react';
import { Provider } from "react-redux";

import { getStore } from "../ClientStore";
import Test from "./Test";

export default class App extends Component {
  render() {
    return (
      <Provider store={getStore()}>
        <Test />
      </Provider>
    );
  }
}
