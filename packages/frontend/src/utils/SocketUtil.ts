import {io, Socket, SocketOptions} from "socket.io-client";
import {ManagerOptions} from "socket.io-client/build/manager";
import {config} from "../config/config";

const DEFAULT_URI = config.server.socketDomain;


type Options = Partial<ManagerOptions & SocketOptions & {namespace: string, uri: string}>;


/**
 * Socket Util
 * @author Ingo Andelhofs
 */
class SocketUtil {

  public static createSocket(options?: Options): Socket {
    const {namespace = undefined, uri = DEFAULT_URI, ...rest} = options ?? {};
    const URI = namespace ? `${uri}/${options?.namespace}` : uri;

    return io(URI, rest);
  }
}

export default SocketUtil;
