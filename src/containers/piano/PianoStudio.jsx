import React, { useState } from "react";
import Piano from "../../components/piano/Piano";

import styles from "./styles/piano-studio.module.css";

const PianoStudio = () => {
  const [pressedNotes, setPressedNotes] = useState([]);

  return (
    <div>
      <div>
        <Piano notes={pianoNotes} onKeyPressed={handleKeyPress} />
      </div>

      <div>
        <p>Logs</p>
        <div className={styles.pressed_notes}>
          {pressedNotes.map((note, index) => (
            <div className={styles.pressed_note} key={index}>
              {note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function handleKeyPress(pressedNote) {
    const updatedPressedNotes = [...pressedNotes, pressedNote];
    setPressedNotes(updatedPressedNotes);
  }
};

PianoStudio.propTypes = {};

export default PianoStudio;

const pianoNotes = [
  { keyNote: "C" },
  { keyNote: "C#", isSharpOrFlatKey: true },
  { keyNote: "D" },
  { keyNote: "D#", isSharpOrFlatKey: true },
  { keyNote: "E" },
  { keyNote: "F" },
  { keyNote: "F#", isSharpOrFlatKey: true },
  { keyNote: "G" },
  { keyNote: "G#", isSharpOrFlatKey: true },
  { keyNote: "A" },
  { keyNote: "A#", isSharpOrFlatKey: true },
  { keyNote: "B" }
];
