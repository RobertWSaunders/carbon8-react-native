import io from "socket.io-client";

class ClientSocketMiddleware {
  constructor(opts) {
    this.store;
    this.socket;
    this.buffer = [];

    this.socketUri = opts.socketUri;
    this.storageAccess = opts.storageAccess;
    this.accessTokenKey = opts.accessTokenKey;
    this.socketEventActionMap = opts.socketEventActionMap;
    this.middlewareActionRegex = opts.middlewareActionRegex;
    this.socketConnectionActionTypes = opts.socketConnectionActionTypes;
    this.socketAuthenticateOnConnect = opts.socketAuthenticateOnConnect;
    this.socketAuthenticateAction = opts.socketAuthenticateAction || false;
    this.socketDisconnectAction = opts.socketDisconnectAction;
  }

  isSocketMiddlewareAction(action) {
    return action.type.match(this.middlewareActionRegex);
  }

  getSocketActionFromReduxAction(action) {
    const words = action.type.split("/");

    return words[words.length - 1];
  }

  createSocketConnection() {
    this.socket = io(this.socketUri, {
      path: "/socket",
      transports: ["websocket"],
      reconnection: false
    });

    this.socket.on("connect", async () => {
      if (this.socketAuthenticateOnConnect) {
        const accessToken = await this.storageAccess.getValue(
          this.accessTokenKey
        );

        if (accessToken) {
          this.socket.emit(this.socketAuthenticateAction, {
            accessToken
          });
        }
      }

      if (this.buffer.length > 0) {
        this.buffer.forEach((action) => {
          this.socket.emit(this.getSocketActionFromReduxAction(action));
        });
      }

      this.store.dispatch({ type: this.socketConnectionActionTypes.connected });
    });

    this.socket.on("disconnect", () => {
      this.socket = null;

      this.store.dispatch({
        type: this.socketConnectionActionTypes.disconnected
      });
    });

    this.socket.on("message", (event) => {
      if (event.type && this.socketEventActionMap[event.type]) {
        this.store.dispatch({
          type: this.socketEventActionMap[event.type],
          data: event.data
        });
      }
    });
  }

  handleSocketAction(action) {
    if (!this.socket) {
      this.buffer.push(action);

      return this.createSocketConnection();
    }

    const socketAction = this.getSocketActionFromReduxAction(action);

    if (socketAction === this.socketDisconnectAction) {
      this.socket.disconnect();
    } else {
      this.socket.emit(socketAction);
    }
  }

  socketMiddleware() {
    return (storeRef) => {
      this.store = storeRef;

      return (next) => (action) => {
        if (this.isSocketMiddlewareAction(action)) {
          this.handleSocketAction(action);
        }

        next(action);
      };
    };
  }
}

function createSocketMiddleware(opts) {
  const socketMiddlware = new ClientSocketMiddleware(opts);

  return socketMiddlware.socketMiddleware();
}

export default createSocketMiddleware;
