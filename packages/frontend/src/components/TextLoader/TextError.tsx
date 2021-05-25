import React, {Component, HTMLAttributes, ReactNode} from "react";
import "./TextLoader.css";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  text: string;
}

interface State {}


/**
 * TextError Component
 * @author Ingo Andelhofs
 */
class TextError extends Component<Props, State> {

  // Rendering
  public render(): ReactNode {
    const {text, ...rest} = this.props;

    return <span
      className="text-loader text-error"
      children={text}
      {...rest}
    />;
  }
}

export default TextError;