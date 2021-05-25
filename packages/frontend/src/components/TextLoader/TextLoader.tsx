import React, {Component, HTMLAttributes, ReactNode} from "react";
import "./TextLoader.css";


interface Props extends HTMLAttributes<HTMLSpanElement> {
  text: string;
}

interface State {}


/**
 * TextLoader Component
 * @author Ingo Andelhofs
 */
class TextLoader extends Component<Props, State> {

  // Rendering
  public render(): ReactNode {
    const {text, className, ...rest} = this.props;
    const cls = `text-loader ${className}`.trim();

    return <span
      className={cls}
      children={[
        <span key="text" className="text">{text}</span>,
        <span key="dot-1" className="dot dot-1">.</span>,
        <span key="dot-2" className="dot dot-2">.</span>,
        <span key="dot-3" className="dot dot-3">.</span>
      ]}
      {...rest}
    />;
  }
}

export default TextLoader;