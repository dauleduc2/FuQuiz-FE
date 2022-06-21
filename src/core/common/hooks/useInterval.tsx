// import { useEffect, useLayoutEffect, useRef } from 'react';

// export function useInterval(callback: () => void, delay: number | null) {
//     const savedCallback = useRef(callback);

//     useLayoutEffect(() => {
//         savedCallback.current = callback;
//     }, [callback]);

//     useEffect(() => {
//         if (!delay && delay !== 0) {
//             return;
//         }

//         const id = setInterval(() => savedCallback.current(), delay);

//         return () => clearInterval(id);
//     }, [delay]);
// }

import { useEffect, useRef, useLayoutEffect } from 'react';

// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Remember the latest callback if it changes.

    useIsomorphicLayoutEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the timeout.

    useEffect(() => {
        // Don't schedule if no delay is specified.

        // Note: 0 is a valid value for delay.

        if (!delay && delay !== 0) {
            return;
        }

        const id = setTimeout(() => savedCallback.current(), delay);

        return () => clearTimeout(id);
    }, [delay]);
}

export default useTimeout;
