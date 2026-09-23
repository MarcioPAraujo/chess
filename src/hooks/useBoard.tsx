"use client";

import { ISquare } from "@/interfaces/Square";
/**
 *
 * @returns return the board squares in a matrix to be rendered and a map with the square id as th key
 */
export const useBoard = () => {
    const boardSquares: ISquare[][] = Array.from({ length: 8 }, (_, i) => {
        return Array.from({ length: 8 }, (_, j) => {
            return {
                x: j + 1,
                y: 8 - i,
            };
        });
    });

    const xCoordinates = Array.from({ length: 8 }, (_, i) =>
        String.fromCharCode(97 + i),
    );

    const boardMap: Map<string, ISquare> = new Map();

    boardSquares.forEach((row) => {
        row.forEach((square) => {
            boardMap.set(`${square.x}${square.y}`, square);
        });
    });

    return {
        boardSquares,
        boardMap,
        xCoordinates,
    };
};
