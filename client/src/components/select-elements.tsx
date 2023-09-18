"use client";

import { useRef, useState, CSSProperties, MouseEvent, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const SelectElements = ({ children }: Props) => {
    const divRef = useRef<HTMLDivElement>(null);

    const [isSelecting, setIsSelecting] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [endPos, setEndPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (divRef.current) {
            const offsetX =
                e.clientX - divRef.current.getBoundingClientRect().left;
            const offsetY =
                e.clientY - divRef.current.getBoundingClientRect().top;
            setStartPos({ x: offsetX, y: offsetY });
            setEndPos({ x: offsetX, y: offsetY });
            setIsSelecting(true);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isSelecting && divRef.current) {
            const offsetX =
                e.clientX - divRef.current.getBoundingClientRect().left;
            const offsetY =
                e.clientY - divRef.current.getBoundingClientRect().top;
            setEndPos({ x: offsetX, y: offsetY });
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        setIsSelecting(false);
    };

    const getSelectionBoxStyle = (): CSSProperties => {
        const top = Math.min(startPos.y, endPos.y);
        const left = Math.min(startPos.x, endPos.x);
        const width = Math.abs(startPos.x - endPos.x);
        const height = Math.abs(startPos.y - endPos.y);

        return {
            position: "absolute",
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            pointerEvents: "none",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
        };
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={divRef}
            className="relative select-none w-full h-full p-4"
        >
            {children}

            {isSelecting && <div style={getSelectionBoxStyle()}></div>}
        </div>
    );
};

export default SelectElements;
