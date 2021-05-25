import React, {Component, ReactNode} from "react";
import {config} from "./config/config";


interface Props {}

interface State {}


/**
 * App Component
 * @author Ingo Andelhofs
 */
class App extends Component<Props, State> {

  // Lifecycle
  public async componentDidMount() {
    const rawFetch = await fetch(config.server.domain);
    const ping = await rawFetch.json();

    console.log(ping);
  }

  // Rendering
  public render(): ReactNode {
    return <h1>Connect 4 - Multiplayer</h1>;
  }
}

export default App;