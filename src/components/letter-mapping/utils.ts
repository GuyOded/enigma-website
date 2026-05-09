import type { Arrow } from "./types";

export const calculateArrowPositions = (
    fromElem: HTMLDivElement,
    toElem: HTMLDivElement,
): Arrow => {
    const fromBoundingBox = fromElem.getBoundingClientRect();
    const toBoundingBox = toElem.getBoundingClientRect();

    return {
        from: {
            x: fromBoundingBox.left + fromBoundingBox.width / 2,
            y: fromBoundingBox.top + fromBoundingBox.height,
        },
        to: {
            x: toBoundingBox.left + toBoundingBox.width / 2,
            y: toBoundingBox.top,
        },
    };
};
