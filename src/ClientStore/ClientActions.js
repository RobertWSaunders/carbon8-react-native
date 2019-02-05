const clientActionTypes = {
  AUTHENTICATE: "@@/client/AUTHENTICATE",
  UNAUTHENTICATE: "@@/client/UNAUTHENTICATE",

  SET_USER: "@@/client/SET_USER"
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

  MOBILE_TEST: "@@/client/server/socket/MOBILE_TEST"
};

export const serverSocketEventActionMap = {
  ["TEST"]: serverSocketMiddlewareActionTypes.MOBILE_TEST
};

export const actionTypes = {
  ...clientActionTypes,
  ...serverSocketMiddlewareActionTypes
};

const clientActionCreators = {
  authenticate: (authInfo) => ({ type: actionTypes.AUTHENTICATE, data: { authInfo }}),
  unauthenticate: () => ({ type: actionTypes.UNAUTHENTICATE }),

  setUser: (user) => ({ type: actionTypes.SET_USER, data: { user } })
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