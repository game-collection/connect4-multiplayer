import {config} from "../config/config";
import SocketUtil from "../utils/SocketUtil";

class GameSocket {

  public static socket = SocketUtil.createSocket({
    uri: config.server.domain,
    namespace: "game",
    transports: ["websocket"],
  });

  public static onConnectError = (callback: (error: Error) => void) => {
    GameSocket.socket.on("connect_error", callback);
  }

  public static onConnect = (callback: () => void) => {
    GameSocket.socket.on("connect", callback);
  }
}

export default GameSocket;
