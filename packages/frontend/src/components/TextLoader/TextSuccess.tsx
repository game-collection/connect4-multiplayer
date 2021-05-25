import React, {Component, HTMLAttributes, ReactNode} from "react";
import "./TextLoader.css";


interface Props extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  autoHide: boolean;
}

interface State {
  classes: string;
}


/**
 * TextError Component
 * @author Ingo Andelhofs
 */
class TextError extends Component<Props, State> {

  // State
  public state: State = {
    classes: "",
  };

  // Helpers
  public hide = () => {
    this.setState(() => ({classes: "hidden"}));
  }

  // Lifecycle
  public componentDidMount() {
    if (this.props.autoHide) {
      setTimeout(this.hide, 2000);
    }
  }

  // Rendering
  public render(): ReactNode {
    const {text, autoHide, ...rest} = this.props;

    return <span
      className={"text-loader text-success " + this.state.classes}
      children={text}
      {...rest}
    />;
  }
}

export default TextError;