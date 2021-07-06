import React, {Component, CSSProperties, ReactNode} from "react";
import {config} from "./config/config";
import TextLoader from "./components/TextLoader/TextLoader";
import TextError from "./components/TextLoader/TextError";
import TextSuccess from "./components/TextLoader/TextSuccess";
import GameSocket from "./socket/GameSocket";
import { v4 as uuid } from 'uuid';
import "./css/app.css";


interface Props {}

interface State {
  serverStatus: "connecting" | "reconnecting" | "connected" | "error";
  rooms: any[];
}


/**
 * App Component
 * @author Ingo Andelhofs
 */
class App extends Component<Props, State> {

  // Members
  private timeouts: any[] = [];

  // State
  public state: State = {
    serverStatus: "connecting",
    rooms: [],
  };

  // Helpers
  public tryConnect = async () => {
    try {
      if (this.state.serverStatus === "error") {
        this.setState(() => ({serverStatus: "reconnecting"}));
      }

      const rawFetch = await fetch(config.server.domain);
      const ping = await rawFetch.json();
      console.log(ping);

      this.setState(() => ({serverStatus: "connected"}));
    } catch (e) {
      this.setState(() => ({serverStatus: "error"}));
      // const id = setTimeout(this.tryConnect, 10000);
      // this.timeouts.push(id);
    }
  }

  public setupSocket = () => {
    GameSocket.onConnectError((error: Error) => {
      console.error(error.message);
    });

    GameSocket.onConnect(() => {
      console.log("Socket: Connected");
    });

    GameSocket.socket.on("gameCreated", (payload: {id: string, name: string}) => {
      this.setState((s: State) => ({rooms: [payload, ...s.rooms]}));
    });

    GameSocket.socket.on("removeRoom", (payload) => {
      this.setState((s: State) => {
        const updatedRooms = s.rooms.filter((room: any) => room.id !== payload.id);
        return {rooms: updatedRooms};
      });

    });
  }

  // Listeners
  private onCreateRoom = () => {
    const id: string = uuid();
    GameSocket.socket.emit("createGame", {id: id, name: ""});
  }

  // Lifecycle
  public async componentDidMount() {
    await this.tryConnect();
    this.setupSocket();
  }

  public componentWillUnmount() {
    this.timeouts.forEach((timeout: any) => {
      clearTimeout(timeout);
    });

    this.timeouts = [];
    GameSocket.socket.offAny();
  }

  // Rendering
  private renderServerStatus() {

    const connecting = this.state.serverStatus === "connecting";
    const error = this.state.serverStatus === "error";
    const connected = this.state.serverStatus === "connected";
    const reconnecting = this.state.serverStatus === "reconnecting";

    const loaderStyles: CSSProperties = {
      position: "fixed",
      top: 10,
      left: 10,
      zIndex: 9999999999,
    };

    return <>
      {connecting && <TextLoader
          style={loaderStyles}
          text="Connecting to server"
      />}

      {error && <TextError
          style={loaderStyles}
          text="Connection failed"
      />}

      {reconnecting && <TextLoader
          style={loaderStyles}
          className="text-error"
          text="Trying to reconnect"
      />}

      {connected && <TextSuccess
          style={loaderStyles}
          text="Connected"
          autoHide={false}
      />}
    </>
  }

  private renderRoom = (room: any) => {
    const onJoinRoom = () => {
      GameSocket.socket.emit("joinGame", {id: room.id});
    };

    return <div key={room.id} className="room">
      <span>{room.id}</span>
      <button onClick={onJoinRoom}>Join</button>
    </div>
  }

  public render(): ReactNode {
    const rooms = this.state.rooms;

    return <div className="app">
      {this.renderServerStatus()}

      <div className="wrapper">
        <h1>Connect 4</h1>

        <div className="form-create-room">
          {/*<input type="text" placeholder="Room Name"/>*/}
          <button onClick={this.onCreateRoom}>Create Room</button>
        </div>

        <div className="rooms">
          {rooms.map(this.renderRoom)}
        </div>

      </div>

    </div>;
  }
}

export default App;