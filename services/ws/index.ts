import { END, eventChannel } from "redux-saga";

export function createWebSocketConnection(endpoint: string) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`wss://ws.satangcorp.com/ws/${endpoint}`);

    socket.onopen = function () {
      resolve(socket);
    };

    socket.onerror = function (evt) {
      reject(evt);
    };
  });
}

export function createSocketChannel(socket: WebSocket) {
  return eventChannel((emit) => {
    socket.onmessage = (event: any) => {
      const json = JSON.parse(event.data);
      emit(json);
    };

    socket.onclose = () => {
      emit(END);
    };

    const unsubscribe = () => {
      socket.onmessage = null;
    };

    return unsubscribe;
  });
}
