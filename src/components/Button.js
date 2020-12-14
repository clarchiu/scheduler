import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  const { confirm, danger } = props;
  const buttonClass = classNames('button', {
    "button--confirm": confirm,
    "button--danger": danger,
  });

  return (
    <button 
      className={buttonClass} 
      onClick={props.onClick} 
      disabled={props.disabled}
    >
        {props.children}
    </button>
  );
}
