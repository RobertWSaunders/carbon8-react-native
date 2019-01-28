import { actionTypes } from "./ClientActions";

export const reducerMount = "client";

const initialState = {
  isAuthenticated: false,

  user: null,

  serverSocketConnected: false,
};

export const selectors = {
  getIsAuthenticated: (state) => state[reducerMount].isAuthenticated,

  getUser: (state) => state[reducerMount].user,

  getServerSocketConnected: (state) =>
    state[reducerMount].serverSocketConnected,
};

const handlers = {
  [actionTypes.SET_USER]: (state, action) => {
    const { user } = action.data;

    return {
      ...state,
      user
    };
  },
  [actionTypes.AUTHENTICATED]: (state) => {
    return {
      ...state,
      isAuthenticated: true
    };
  },
  [actionTypes.UNAUTHENTICATED]: (state) => {
    return {
      ...state,
      isAuthenticated: false
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