const clientActionTypes = {
  AUTHENTICATED: "@@/client/AUTHENTICATED",
  UNAUTHENTICATED: "@@/client/UNAUTHENTICATED",

  SET_USER: "@@/client/SET_USER"
};

const serverSocketMiddlewareActionTypes = {
  SERVER_SOCKET_CONNECTED: "@@/client/server/internal/SERVER_SOCKET_CONNECTED",
  SERVER_SOCKET_DISCONNECTED:
    "@@/client/server/internal/SERVER_SOCKET_DISCONNECTED",

  // Actions

  AUTHENTICATE_FOUNTAIN: "@@/client/server/socket/AUTHENTICATE_FOUNTAIN",

  // Events

  TRIGGER_SERVER_CONNECTION: "@@/client/server/socket/TRIGGER_CONNECTION"
};

export const serverSocketEventActionMap = {
  ["TEST"]: serverSocketMiddlewareActionTypes.SOCKET_TEST
};

export const actionTypes = {
  ...clientActionTypes,
  ...serverSocketMiddlewareActionTypes
};

const clientActionCreators = {
  authenticated: () => ({ type: actionTypes.AUTHENTICATED }),
  unauthenticated: () => ({ type: actionTypes.UNAUTHENTICATED}),

  setUser: (user) => ({ type: actionTypes.SET_USER, data: { user } })
};

const invokeServerSocketActionCreators = {
  triggerServerConnection: () => ({
    type: actionTypes.TRIGGER_SERVER_CONNECTION
  })
};

export const actionCreators = {
  ...clientActionCreators,
  ...invokeServerSocketActionCreators
};