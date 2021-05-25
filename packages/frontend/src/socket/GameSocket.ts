import {config} from "../config/config";
import SocketUtil from "../utils/SocketUtil";

export const gameSocket = SocketUtil.createSocket({
  uri: config.server.domain,
  namespace: "game",
  transports: ["websocket"],
});