import { createWebSocketConnection } from ".";

export const MiniTickerWs = () => createWebSocketConnection("!miniTicker@arr");
