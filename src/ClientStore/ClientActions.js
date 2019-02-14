const clientActionTypes = {
  AUTHENTICATE: "@@/client/AUTHENTICATE",
  UNAUTHENTICATE: "@@/client/UNAUTHENTICATE",

  SET_USER: "@@/client/SET_USER",
  SET_SCAN_CODE: "@@/client/SET_SCAN_CODE"
};

const serverSocketMiddlewareActionTypes = {
  SERVER_SOCKET_CONNECTED: "@@/client/server/internal/SERVER_SOCKET_CONNECTED",
  SERVER_SOCKET_DISCONNECTED:
    "@@/client/server/internal/SERVER_SOCKET_DISCONNECTED",

  // Actions

  TRIGGER_SERVER_CONNECTION: "@@/client/server/socket/TRIGGER_SERVER_CONNECTION",
  TRIGGER_SERVER_DISCONNECTION: "@@/client/server/socket/TRIGGER_SERVER_DISCONNECTION",

  AUTHENTICATE_FOUNTAIN: "@@/client/server/socket/AUTHENTICATE_FOUNTAIN",

  // Events

  DISPENSING_FLAT_WATER_START: "@@/client/server/internal/DISPENSING_FLAT_WATER_START",
  DISPENSING_FLAT_WATER_END: "@@/client/server/internal/DISPENSING_FLAT_WATER_END",
  DISPENSING_SPARKLING_WATER_START: "@@/client/server/internal/DISPENSING_SPARKLING_WATER_START",
  DISPENSING_SPARKLING_WATER_END: "@@/client/server/internal/DISPENSING_SPARKLING_WATER_END",

  SCAN_CODE_COMPLETE: "@@/client/server/internal/SCAN_CODE_COMPLETE"
};

export const serverSocketEventActionMap = {
  ["DISPENSING_FLAT_WATER_START"]: serverSocketMiddlewareActionTypes.DISPENSING_FLAT_WATER_START,
  ["DISPENSING_FLAT_WATER_END"]: serverSocketMiddlewareActionTypes.DISPENSING_FLAT_WATER_END,
  ["DISPENSING_SPARKLING_WATER_START"]: serverSocketMiddlewareActionTypes.DISPENSING_SPARKLING_WATER_START,
  ["DISPENSING_SPARKLING_WATER_END"]: serverSocketMiddlewareActionTypes.DISPENSING_SPARKLING_WATER_END,
  ["SCAN_CODE_COMPLETE"]: serverSocketMiddlewareActionTypes.SCAN_CODE_COMPLETE
};

export const actionTypes = {
  ...clientActionTypes,
  ...serverSocketMiddlewareActionTypes
};

const clientActionCreators = {
  authenticate: (authInfo) => ({ type: actionTypes.AUTHENTICATE, data: { authInfo }}),
  unauthenticate: () => ({ type: actionTypes.UNAUTHENTICATE }),

  setUser: (user) => ({ type: actionTypes.SET_USER, data: { user } }),
  setScanCode: (code) => ({ type: actionTypes.SET_SCAN_CODE, data: { code }})
};

const invokeServerSocketActionCreators = {
  triggerServerConnection: () => ({
    type: actionTypes.TRIGGER_SERVER_CONNECTION
  }),
  triggerServerDisconnection: () => ({
    type: actionTypes.TRIGGER_SERVER_DISCONNECTION
  })
};

export const actionCreators = {
  ...clientActionCreators,
  ...invokeServerSocketActionCreators
};
