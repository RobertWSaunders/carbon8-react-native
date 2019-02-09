import { actionTypes } from "./ClientActions";

export const reducerMount = "client";

const initialState = {
  authenticated: false,

  user: null,

  scanCode: null,

  appSessionId: null,

  serverSocketConnected: false,

  test: ""
};

export const selectors = {
  getAuthenticated: (state) => state[reducerMount].authenticated,

  getUser: (state) => state[reducerMount].user,

  getScanCode: (state) =>  state[reducerMount].scanCode,

  getServerSocketConnected: (state) =>
    state[reducerMount].serverSocketConnected,

  getTest: (state) => state[reducerMount].test
};

const handlers = {
  [actionTypes.MOBILE_TEST]: (state, action) => {
    const { test } = action.data;

    return {
      ...state,
      test
    };
  },
  [actionTypes.SET_USER]: (state, action) => {
    const { user } = action.data;

    return {
      ...state,
      user
    };
  },
  [actionTypes.AUTHENTICATE]: (state, action) => {
    const { scanCode, appSessionId, user } = action.data.authInfo;

    return {
      ...state,
      user,
      scanCode,
      appSessionId,
      authenticated: true
    };
  },
  [actionTypes.UNAUTHENTICATE]: (state) => {
    return {
      ...initialState
    };
  },
  [actionTypes.SERVER_SOCKET_CONNECTED]: (state) => {
    return {
      ...state,
      serverSocketConnected: true
    };
  },
  [actionTypes.SERVER_SOCKET_DISCONNECTED]: (state) => {
    return {
      ...state,
      serverSocketConnected: false
    };
  }
};

export function reducer(state = initialState, action) {
  if (handlers[action.type]) return handlers[action.type](state, action);

  return state;
}
