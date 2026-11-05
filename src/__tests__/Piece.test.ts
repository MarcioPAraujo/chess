import { describe, it, expect } from "vitest";
import { isPieceCodeValid } from "../interfaces/Piece";

describe("isPieceCodeValid", () => {
    it("should accept valid chess piece codes", () => {
        const validPieces = [
            "q",
            "Q",
            "k",
            "K",
            "r",
            "R",
            "b",
            "B",
            "n",
            "N",
            "p",
            "P",
        ];
        validPieces.forEach((pieceCode) => {
            expect(isPieceCodeValid(pieceCode)).toBe(true);
        });
    });
    it("should not accept invalid pieces code", () => {
        const invalidPieces = ["a", "w", "e", "1", "qq", "king"];
        invalidPieces.forEach((piece) => {
            expect(isPieceCodeValid(piece)).toBe(false);
        });
    });
});
