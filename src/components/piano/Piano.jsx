import React, { forwardRef, useImperativeHandle } from "react";
import { arrayOf, shape, string, func, bool } from "prop-types";

import styles from "./piano.module.css";
import BlackKey from "./pianoKeys/BlackKey";
import NaturalKey from "./pianoKeys/NaturalKey";
import useRefinedNotes from "./hooks/useRefinedNotes";

const Piano = forwardRef(({ notes = [], onKeyPressed }, ref) => {
  const [referencedNotes] = useRefinedNotes(notes);

  useImperativeHandle(ref, () => ({
    pressNote
  }));

  return (
    <div className={styles.container}>
      <div className={styles.keys}>
        {referencedNotes.map((note, index) => {
          const { keyNote, isSharpOrFlatKey } = note || {};

          return isSharpOrFlatKey ? (
            <BlackKey ref={ref => (note.ref = ref)} key={index} keyNote={keyNote} onPressed={onKeyPressed} />
          ) : (
            <NaturalKey ref={ref => (note.ref = ref)} key={index} keyNote={keyNote} onPressed={onKeyPressed} />
          );
        })}
      </div>
    </div>
  );

  function pressNote(pressedNote) {
    const selectedKey = referencedNotes.find((refinedNote = {}) => refinedNote.keyNote === pressedNote);
    selectedKey && selectedKey.ref && selectedKey.ref.handleKeyPressed && selectedKey.ref.handleKeyPressed();
  }
});

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
