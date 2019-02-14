import { actionTypes } from "./ClientActions";

export const reducerMount = "client";

const initialState = {
  authenticated: false,

  user: null,

  scanCode: null,

  appSessionId: null,

  serverSocketConnected: false,

  dispensingWater: false,
  fetchNewScanCodeForSession: false
};

export const selectors = {
  getAuthenticated: (state) => state[reducerMount].authenticated,

  getUser: (state) => state[reducerMount].user,

  getScanCode: (state) =>  state[reducerMount].scanCode,

  getServerSocketConnected: (state) =>
    state[reducerMount].serverSocketConnected,

  getAppSessionId: (state) => state[reducerMount].appSessionId,

  getDispensingWater: (state) => state[reducerMount].dispensingWater,
  getFetchNewScanCodeForSession: (state) => state[reducerMount].fetchNewScanCodeForSession
};

const handlers = {
  [actionTypes.SET_SCAN_CODE]: (state, action) => {
    const { code } = action.data;

    return {
      ...state,
      scanCode: code,
      fetchNewScanCodeForSession: false
    };
  },
  [actionTypes.DISPENSING_WATER_START]: (state, action) => {
    return {
      ...state,
      dispensingWater: true
    };
  },
  [actionTypes.DISPENSING_WATER_END]: (state, action) => {
    return {
      ...state,
      dispensingWater: false
    };
  },
  [actionTypes.SCAN_CODE_COMPLETE]: (state, action) => {
    return {
      ...state,
      fetchNewScanCodeForSession: true
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
