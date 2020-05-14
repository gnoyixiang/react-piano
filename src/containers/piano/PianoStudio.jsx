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
    <div className={styles.root}>
      <section className={styles.piano_section}>
        <Piano ref={pianoRef} notes={pianoNotes} onKeyPressed={handleKeyPress} />
      </section>

      <section className={styles.logs_section}>
        <p>Logs</p>

        <div className={styles.pressed_notes}>
          {pressedNotes.map((note, index) => (
            <div className={styles.pressed_note} key={index}>
              {note}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.simulator_section}>
        <p>Simulate Keys</p>

        <form className={styles.simulator} onSubmit={handleSubmitAutoPlayKeys}>
          <input className={styles.simulator_input} type="text" name="keys" ref={autoPlayInputRef} />
          <input className={styles.simulator_submit} type="submit" value="play" />
        </form>
      </section>
    </div>
  );

  function simulatePianoPressed(pressedKey) {
    if (!pressedKey) {
      return;
    }

    pressedKey = pressedKey.toUpperCase();
    const isValidKey = pianoNotes.find((pianoNote = {}) => pianoNote.keyNote === pressedKey);
    if (!isValidKey) {
      alert(`Cannot play key: ${pressedKey}`);
      return;
    }

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
