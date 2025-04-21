import { useEffect, useCallback } from 'react';

const useKeyboardShortcut = (key, callback, modifiers = []) => {
  const handleKeyPress = useCallback(
    (event) => {
      const modifierKeys = {
        ctrl: event.ctrlKey,
        shift: event.shiftKey,
        alt: event.altKey,
        meta: event.metaKey,
      };

      const hasModifiers = modifiers.length > 0;
      const modifiersMatch = hasModifiers
        ? modifiers.every((modifier) => modifierKeys[modifier.toLowerCase()])
        : !Object.values(modifierKeys).some(Boolean);

      if (event.key.toLowerCase() === key.toLowerCase() && modifiersMatch) {
        event.preventDefault();
        callback(event);
      }
    },
    [key, callback, modifiers]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};

// Example usage:
// useKeyboardShortcut('s', handleSave, ['ctrl']);
// useKeyboardShortcut('/', toggleSearch);
// useKeyboardShortcut('Escape', closeModal);

export default useKeyboardShortcut; 