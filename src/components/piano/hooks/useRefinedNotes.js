import { createRef, useEffect, useState } from "react";

function useRefinedNotes(notes) {
  const [refinedNotes, setRefinedNotes] = useState([]);

  useEffect(
    () => {
      const updatedNotes = notes.map(note => ({ ...note, ref: createRef() }));
      setRefinedNotes(updatedNotes);

      return () => [];
    },
    [notes]
  );

  return [refinedNotes];
}

export default useRefinedNotes;
