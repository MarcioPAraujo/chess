import { ISquare } from "./Square";

export type PieceCodeType =
    | "q"
    | "Q"
    | "k"
    | "K"
    | "r"
    | "R"
    | "b"
    | "B"
    | "n"
    | "N"
    | "p"
    | "P";

export interface IPiece extends ISquare {
    // lower case 'black' pieces
    // uppercase 'white' pieces
    code: PieceCodeType;
    movementsMade: number;
}

export const isPieceCodeValid = (code: string): code is PieceCodeType => {
    if (typeof code !== "string") {
        return false;
    }

    if (code.length < 1) {
        return false;
    }

    const pieces = new Set([
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
    ]);

    if (pieces.has(code)) {
        return true;
    }

    return false;
};
