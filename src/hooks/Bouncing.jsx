// hooks/bouncing.jsx
import { useEffect, useState } from "react";

/** Returns a debounced copy of `value` after `delay` ms. */
export function useDebouncedValue(value, delay = 800) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
