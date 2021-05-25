import React, {Component, CSSProperties, ReactNode} from "react";
import {config} from "./config/config";
import TextLoader from "./components/TextLoader/TextLoader";
import "./css/app.css";
import TextError from "./components/TextLoader/TextError";
import TextSuccess from "./components/TextLoader/TextSuccess";


interface Props {}

interface State {
  serverStatus: "connecting" | "connected" | "error";
}


/**
 * App Component
 * @author Ingo Andelhofs
 */
class App extends Component<Props, State> {

  // State
  public state: State = {
    serverStatus: "connecting",
  };

  // Lifecycle
  public async componentDidMount() {
    try {
      const rawFetch = await fetch(config.server.domain);
      const ping = await rawFetch.json();
      console.log(ping);

      this.setState(() => ({serverStatus: "connected"}));
    }
    catch (e) {
      this.setState(() => ({serverStatus: "error"}));
    }
  }

  // Rendering
  public render(): ReactNode {

    const connecting = this.state.serverStatus === "connecting";
    const error = this.state.serverStatus === "error";
    const connected = this.state.serverStatus === "connected";

    const loaderStyles: CSSProperties = {
      position: "fixed",
      top: 10,
      left: 10,
      zIndex: 9999999999,
    };

    return <>
      <br/>
      <br/>

      <h1>Connect 4 - Multiplayer</h1>
      {connecting && <TextLoader style={loaderStyles} text="Connecting to server"/>}
      {error && <TextError style={loaderStyles} text="Connection failed"/>}
      {connected && <TextSuccess style={loaderStyles} text="Connected" autoHide={true}/>}
    </>;
  }
}

export default App;