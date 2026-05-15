import type { Arrow } from "./types";

export const calculateArrowPositions = (
    fromElem: HTMLDivElement,
    toElem: HTMLDivElement,
    containerElem: HTMLDivElement,
): Arrow => {
    const containerBox = containerElem.getBoundingClientRect();
    const fromBoundingBox = fromElem.getBoundingClientRect();
    const toBoundingBox = toElem.getBoundingClientRect();

    return {
        from: {
            x:
                fromBoundingBox.left -
                containerBox.left +
                fromBoundingBox.width / 2,
            y: fromBoundingBox.top - containerBox.top + fromBoundingBox.height,
        },
        to: {
            x: toBoundingBox.left - containerBox.left + toBoundingBox.width / 2,
            y: toBoundingBox.top - containerBox.top,
        },
    };
};
