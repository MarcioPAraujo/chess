import { describe, it, expect } from "vitest";
import { useBoard } from "../hooks/useBoard";
import { ISquare } from "@/interfaces/Square";

describe("board squares", () => {
    it("should have 64 squares", () => {
        const { boardSquares } = useBoard();
        let totalSquares = 0;
        boardSquares.forEach((row) => {
            totalSquares += row.length;
        });
        expect(totalSquares).toBe(64);
    });
    it("should have the correct coordinates", () => {
        const { boardMap } = useBoard();
        const coordinates = [1, 2, 3, 4, 5, 6, 7, 8];

        for (let i = 0; i < coordinates.length; i++) {
            for (let j = 0; j < coordinates.length; j++) {
                const boardSquare = boardMap.get(
                    `${coordinates[i]}${coordinates[j]}`,
                );
                const expectedSquare: ISquare = {
                    x: coordinates[i],
                    y: coordinates[j],
                };
                expect(boardSquare).toStrictEqual(expectedSquare);
            }
        }
    });
    it("should have 8 columns and 8 rows", () => {
        const { boardSquares } = useBoard();

        expect(boardSquares).toHaveLength(8);

        boardSquares.forEach((row) => {
            expect(row).toHaveLength(8);
        });
    });
    it("should have x-axis going from 'a' to 'h'", () => {
        const { xCoordinates } = useBoard();
        const coordinates = ["a", "b", "c", "d", "e", "f", "g", "h"];
        expect(xCoordinates).toStrictEqual(coordinates);
    });
    it("have the correct board orientation", () => {
        const { boardSquares } = useBoard();

        expect(boardSquares[0][0]).toStrictEqual({ x: 1, y: 8 });
        expect(boardSquares[7][7]).toStrictEqual({ x: 8, y: 1 });
    });
    it("should match key coordinates between board matrix and board map", () => {
        const { boardMap, boardSquares } = useBoard();

        boardSquares.forEach((row) => {
            row.forEach((square) => {
                expect(boardMap.get(`${square.x}${square.y}`)).toStrictEqual(
                    square,
                );
            });
        });
    });
});
