import { actionTypes } from "./ClientActions";

export const reducerMount = "client";

const initialState = {
  authenticated: false,

  user: null,

  scanCode: null,

  appSessionId: null,

  serverSocketConnected: false,

  dispensingFlatWater: false,
  dispensingSparklingWater: false,

  fetchNewScanCodeForSession: false
};

export const selectors = {
  getAuthenticated: (state) => state[reducerMount].authenticated,

  getUser: (state) => state[reducerMount].user,

  getScanCode: (state) =>  state[reducerMount].scanCode,

  getServerSocketConnected: (state) =>
    state[reducerMount].serverSocketConnected,

  getAppSessionId: (state) => state[reducerMount].appSessionId,

  getDispensingFlatWater: (state) => state[reducerMount].dispensingFlatWater,
  getDispensingSparklingWater: (state) => state[reducerMount].dispensingSparklingWater,

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
  [actionTypes.SET_USER]: (state, action) => {
    const { user } = action.data;

    return {
      ...state,
      user
    };
  },
  [actionTypes.DISPENSING_FLAT_WATER_START]: (state, action) => {
    return {
      ...state,
      dispensingFlatWater: true
    };
  },
  [actionTypes.DISPENSING_FLAT_WATER_END]: (state, action) => {
    return {
      ...state,
      dispensingFlatWater: false
    };
  },
  [actionTypes.DISPENSING_SPARKLING_WATER_START]: (state, action) => {
    return {
      ...state,
      dispensingSparklingWater: true
    };
  },
  [actionTypes.DISPENSING_SPARKLING_WATER_END]: (state, action) => {
    return {
      ...state,
      dispensingSparklingWater: false
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
