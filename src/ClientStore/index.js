import {
  actionTypes,
  serverSocketEventActionMap,
} from "./ClientActions";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSocketMiddleware from "./ClientSocketMiddleware";
import { reducer, reducerMount } from "./ClientReducer";
import { AsyncStorage } from "react-native";


const IS_PROD = process.env.NODE_ENV === "production";

const SERVER_SOCKET_URI =
  process.env.SERVER_SOCKET_URI || "http://localhost:3001";

export const APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY =
  "CARBON8_APP_ACCESS_TOKEN";

const storageAccess = {
  getValue: (key) => Promise.resolve(AsyncStorage.getItem(key)),
  setValue: (key, value) => Promise.resolve(AsyncStorage.setItem(key, value)),
  removeValue: (key) => Promise.resolve(AsyncStorage.removeItem(key))
};

const serverSocketMiddleware = createSocketMiddleware({
  socketUri: SERVER_SOCKET_URI,
  middlewareActionRegex: /^@@\/client\/server\/socket\/.*/g,
  socketConnectionActionTypes: {
    connected: actionTypes.SERVER_SOCKET_CONNECTED,
    disconnected: actionTypes.SERVER_SOCKET_DISCONNECTED
  },
  socketEventActionMap: serverSocketEventActionMap,
  socketAuthenticateOnConnect: true,
  accessTokenKey: APP_ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  socketAuthenticateAction: "AUTHENTICATE_APP",
  storageAccess
});

export function getStore() {
  const store = createStore(
    combineReducers({
      [reducerMount]: reducer
    }),
    compose(
      applyMiddleware(serverSocketMiddleware),
      !IS_PROD && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  return store;
}

export * from "./ClientActions";
export * from "./ClientReducer";