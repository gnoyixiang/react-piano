import React, { useState, createRef, useRef } from "react";

import Piano from "../../components/piano/Piano";
import styles from "./styles/piano-studio.module.css";
import useAutoPlayKeysOnPiano from "./hooks/useAutoPlayKeysOnPiano";

const PianoStudio = () => {
  const [pressedNotes, setPressedNotes] = useState([]);
  const [autoPlayNotes, setAutoPlayNotes] = useState([]);

  useAutoPlayKeysOnPiano(autoPlayNotes, {
    onKeyPress: pressedKey => {
      simulatePianoPressed(pressedKey);
    }
  });

  const autoPlayInputRef = createRef();
  const pianoRef = useRef();

  return (
    <div>
      <div>
        <Piano ref={pianoRef} notes={pianoNotes} onKeyPressed={handleKeyPress} />
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

      <div>
        <p>Simulate Keys</p>

        <form onSubmit={handleSubmitAutoPlayKeys}>
          <input type="text" name="keys" ref={autoPlayInputRef} />
          <input type="submit" value="play" />
        </form>
      </div>
    </div>
  );

  function simulatePianoPressed(pressedKey) {
    const canPressKeyboard = pressedKey && pianoRef && pianoRef.current && pianoRef.current.pressNote;

    if (canPressKeyboard) pianoRef.current.pressNote(pressedKey);
    else console.log("couldnt press key: ", pressedKey);
  }

  function handleSubmitAutoPlayKeys(event) {
    event.preventDefault();

    const rawText = autoPlayInputRef.current.value;
    const updatedAutoPlayNotes = rawText.split(",");
    setAutoPlayNotes(updatedAutoPlayNotes);
  }

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
