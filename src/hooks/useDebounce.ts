import { useRef, useCallback } from 'react';

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timeoutRef = useRef<number | undefined>();

    const debouncedFunction = useCallback(
        (...args: any[]) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = window.setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    return debouncedFunction;
}
