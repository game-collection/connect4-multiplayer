import React, {Component, CSSProperties, ReactNode} from "react";
import {config} from "./config/config";
import TextLoader from "./components/TextLoader/TextLoader";
import TextError from "./components/TextLoader/TextError";
import TextSuccess from "./components/TextLoader/TextSuccess";
import {gameSocket} from "./socket/GameSocket";
import "./css/app.css";


interface Props {}

interface State {
  serverStatus: "connecting" | "reconnecting" | "connected" | "error";
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
    gameSocket.on("connect_error", (error: Error) => {
      console.error(error.message);
    });

    gameSocket.on("connect", () => {
      console.log("Socket: Connected");
    });
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

  public render(): ReactNode {

    return <>
      {this.renderServerStatus()}

      <br/>
      <br/>

      <h1>Connect 4 - Multiplayer</h1>

    </>;
  }
}

export default App;