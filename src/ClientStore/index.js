import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { AsyncStorage } from "react-native";
import Config from "react-native-config";

import { actionTypes, serverSocketEventActionMap } from "./ClientActions";
import createSocketMiddleware from "./ClientSocketMiddleware";
import { reducer, reducerMount } from "./ClientReducer";

const storageAccess = {
  getValue: (key) => Promise.resolve(AsyncStorage.getItem(key)),
  removeValue: (key) => Promise.resolve(AsyncStorage.removeItem(key)),
  setValue: (key, value) => Promise.resolve(AsyncStorage.setItem(key, value))
};

const serverSocketMiddleware = createSocketMiddleware({
  socketUri: Config.CARBON8_SERVER_URL,
  middlewareActionRegex: /^@@\/client\/server\/socket\/.*/g,
  socketConnectionActionTypes: {
    connected: actionTypes.SERVER_SOCKET_CONNECTED,
    disconnected: actionTypes.SERVER_SOCKET_DISCONNECTED
  },
  socketEventActionMap: serverSocketEventActionMap,
  socketAuthenticateOnConnect: true,
  accessTokenKey: Config.APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  socketAuthenticateAction: "AUTHENTICATE_APP",
  socketDisconnectAction: "TRIGGER_SERVER_DISCONNECTION",
  storageAccess
});

export function getStore() {
  const store = createStore(
    combineReducers({
      [reducerMount]: reducer
    }),
    compose(
      applyMiddleware(serverSocketMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  return store;
}

export * from "./ClientActions";
export * from "./ClientReducer";
