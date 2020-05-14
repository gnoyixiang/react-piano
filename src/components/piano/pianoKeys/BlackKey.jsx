import React, { useImperativeHandle, useState, forwardRef } from "react";
import classNames from "classnames";
import { func, string } from "prop-types";

import styles from "../piano.module.css";

const config = {
  TIME_TO_ACTIVATE_KEY_PRESS: 1000 // 1 millisecond
};

const BlackKey = forwardRef(({ keyNote, onPressed }, ref) => {
  const [isPressed, setPressed] = useState(false);

  // todo duplicate found. merged
  useImperativeHandle(ref, () => ({
    handleKeyPressed
  }));

  const mainClass = classNames(styles.key, styles.black_key, {
    [styles.black_key__pressed]: isPressed
  });

  return (
    <div className={mainClass} onClick={handleKeyPressed}>
      <div>{keyNote}</div>
    </div>
  );

  // todo duplicate function, merge both
  function handleKeyPressed() {
    // Simulate a finger press on the keyboard before delegating press action to parent component
    setPressed(true);

    // After X seconds, deactivate the "pressed" state of the keyboard
    setTimeout(() => setPressed(false), config.TIME_TO_ACTIVATE_KEY_PRESS);

    const hasExternalPresHandler = typeof onPressed === "function";
    if (hasExternalPresHandler) onPressed(keyNote);
  }
});

BlackKey.propTypes = { onPressed: func, keyNote: string };

export default BlackKey;
