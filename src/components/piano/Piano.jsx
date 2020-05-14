import React from "react";
import { arrayOf, shape, string, func, bool } from "prop-types";

import styles from "./piano.module.css";
import BlackKey from "./pianoKeys/BlackKey";
import NaturalKey from "./pianoKeys/NaturalKey";

const Piano = ({ notes = [], onKeyPressed }) => {
  return (
    <div className={styles.container}>
      <div className={styles.keys}>
        {notes.map((note, index) => {
          const { keyNote, isSharpOrFlatKey } = note || {};
          return isSharpOrFlatKey ? (
            <BlackKey key={index} keyNote={keyNote} onPressed={onKeyPressed} />
          ) : (
            <NaturalKey key={index} keyNote={keyNote} onPressed={onKeyPressed} />
          );
        })}
      </div>
    </div>
  );
};

Piano.propTypes = {
  notes: arrayOf(
    shape({
      keyNote: string,
      isSharpOrFlatKey: bool
    })
  ),
  onKeyPressed: func
};

export default Piano;
