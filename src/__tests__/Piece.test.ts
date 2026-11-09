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
    const invalidPieces = ["a", "w", "e", "1", "qq", "king"];
    it.each(invalidPieces)(
        "should not accept '%s' as a piece code",
        (pieceCode) => {
            expect(isPieceCodeValid(pieceCode)).toBe(false);
        },
    );
});
