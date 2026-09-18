import { ISquare } from "./Square";

export interface IPiece extends ISquare {
    // lower case 'black' pieces
    // uppercase 'white' pieces
    code: "q" | "Q" | "k" | "K" | "r" | "R" | "b" | "B" | "n" | "N" | "p" | "P";
    movementsMade: number;
    allowedMoves: ISquare[];
}
