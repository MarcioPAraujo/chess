import { ICoordinate } from "./Coordinate";

export interface IPiece extends ICoordinate {
    // lower case 'black' pieces
    // uppercase 'white' pieces
    code: "q" | "Q" | "k" | "K" | "r" | "R" | "b" | "B" | "n" | "N" | "p" | "P";
}
