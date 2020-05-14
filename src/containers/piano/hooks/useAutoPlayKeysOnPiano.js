import { useEffect } from 'react';

function useAutoPlayKeysOnPiano(keys, { onKeyPress }) {
  useEffect(
    () => {
      const intervalId = setInterval(() => {
        if (keys.length !== 0) {
          const pressedKey = keys[0];
          onKeyPress(pressedKey);

          keys.shift();
        } else clearInterval(intervalId);
      }, 1000);

      return () => clearInterval(intervalId);
    },
    [keys]
  );
}

export default useAutoPlayKeysOnPiano;
