import React from "react";
import { storiesOf } from "@storybook/react";

import Piano from "./";

storiesOf("Piano", module).add("Piano Samples", () => {
  return (
    <div>
      <Piano notes={sampleNotes.first} onKeyPressed={handlePianoKeyPressed} />
    </div>
  );
});

function handlePianoKeyPressed(keyNote) {
  console.log("piano key press:", keyNote);
}

const sampleNotes = {
  first: [
    { keyNote: "A" },
    { keyNote: "B#", isSharpOrFlatKey: true },
    { keyNote: "B" },
    { keyNote: "C#", isSharpOrFlatKey: true },
    { keyNote: "C" },
    { keyNote: "D#", isSharpOrFlatKey: true },
    { keyNote: "D" },
    { keyNote: "E" },
    { keyNote: "F" }
  ]
};
