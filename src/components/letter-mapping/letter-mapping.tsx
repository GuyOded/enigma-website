import { useId, useLayoutEffect, useRef, useState } from "react";
import type { Arrow } from "./types";

export interface LetterMappingProps {
    readonly from: string[];
    readonly to: string[];
    readonly enableArrows: boolean;
}

export const LetterMapping = ({
    from,
    to,
    enableArrows,
}: LetterMappingProps) => {
    const fromId = useId();
    const toId = useId();

    const containerRef = useRef<HTMLDivElement>(null);
    const fromCellsRef = useRef(new Map<string, HTMLDivElement>());
    const toCellsRef = useRef(new Map<string, HTMLDivElement>());

    const [arrows, setArrows] = useState<Arrow[]>([]);

    useLayoutEffect(() => {
        if (!enableArrows) return;

        const nextArrows = from
            .map((fromValue, i) => {
                const toValue = to[i];
                if (!containerRef.current) {
                    return null;
                }

                const fromElem = fromCellsRef.current.get(
                    `${fromId}-${fromValue}`,
                );
                const toElem = toCellsRef.current.get(`${toId}-${toValue}`);
                if (!fromElem || !toElem) return null;

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
            })
            .filter(Boolean) as Arrow[];
        setArrows(nextArrows);
    }, [from, to, enableArrows, fromId, toId]);

    return (
        <div
            ref={containerRef}
            className={`flex flex-col ${enableArrows ? "gap-25" : "gap-4"}`}
        >
            <div className="flex flex-row gap-2">
                {from.map((cellValue) => (
                    <div
                        id={`${fromId}-${cellValue}`}
                        key={`${fromId}-${cellValue}`}
                        className="flex items-center justify-center w-10 h-10 rounded bg-cyan-100"
                        ref={(div) => {
                            if (div)
                                fromCellsRef.current.set(
                                    `${fromId}-${cellValue}`,
                                    div,
                                );
                            else
                                fromCellsRef.current.delete(
                                    `${fromId}-${cellValue}`,
                                );
                        }}
                    >
                        {cellValue}
                    </div>
                ))}
            </div>
            <div className="flex flex-row gap-2">
                {to.map((cellValue) => (
                    <div
                        id={`${toId}-${cellValue}`}
                        key={`${toId}-${cellValue}`}
                        className="flex items-center justify-center w-10 h-10 rounded bg-cyan-100"
                        ref={(div) => {
                            if (div)
                                toCellsRef.current.set(
                                    `${toId}-${cellValue}`,
                                    div,
                                );
                            else
                                toCellsRef.current.delete(
                                    `${toId}-${cellValue}`,
                                );
                        }}
                    >
                        {cellValue}
                    </div>
                ))}
            </div>

            {enableArrows && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none text-cyan-600">
                    <defs>
                        <marker
                            id="arrow"
                            viewBox="0 0 10 10"
                            refX="8"
                            refY="5"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto-start-reverse"
                        >
                            <path
                                d="M 0 0 L 10 5 L 0 10 z"
                                fill="currentColor"
                            />
                        </marker>
                    </defs>
                    {arrows.map((arrow, i) => (
                        <line
                            key={i}
                            className="stroke-current"
                            x1={arrow.from.x}
                            y1={arrow.from.y}
                            x2={arrow.to.x}
                            y2={arrow.to.y}
                            strokeWidth={2}
                            markerEnd="url(#arrow)"
                        />
                    ))}
                </svg>
            )}
        </div>
    );
};
