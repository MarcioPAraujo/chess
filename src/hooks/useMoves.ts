import { IPiece, isPieceCodeValid } from "@/interfaces/Piece";
import { ISquare } from "@/interfaces/Square";
import { isUpperCase } from "@/utils/verifyCase";
/**
 *
 * @param piece piece being moved
 * @param rows number of rows to move, positive means forward and negative backwards
 * @param columns number of columns moved, positve means move to right, and negative moves to left
 * @returns the new position
 */
const newPlace = (
    piece: IPiece,
    rows: number = 0,
    columns: number = 0,
): ISquare => {
    const isWhite = isUpperCase(piece.code);
    if (isWhite) {
        return {
            y: piece.y + rows,
            x: piece.x + columns,
        };
    }
    // because black the board is mirrored, the moves are opossite to the white
    return {
        y: piece.y + rows * -1,
        x: piece.x + columns * -1,
    };
};

const pawn = (
    piece: IPiece,
    otherPieces: Map<string, IPiece>,
): Map<string, ISquare> => {
    const moves: Map<string, ISquare> = new Map<string, ISquare>();

    const oneMoveForward = newPlace(piece, 1);
    const oneFoward = otherPieces.get(`${oneMoveForward.x}${oneMoveForward.y}`);
    if (!oneFoward) {
        moves.set(`${oneMoveForward.x}${oneMoveForward.y}`, oneMoveForward);
    }

    if (piece.movementsMade === 0 && !oneFoward) {
        const forward = newPlace(piece, 2);
        const twoForward = otherPieces.get(`${forward.x}${forward.y}`);
        if (!twoForward) {
            moves.set(`${forward.x}${forward.y}`, forward);
        }
    }

    const left = newPlace(piece, 1, -1);
    const leftTakePiece = otherPieces.get(`${left.x}${left.y}`);
    const hasLeftTake = left.x >= 1 && leftTakePiece !== undefined;
    if (
        hasLeftTake &&
        isUpperCase(leftTakePiece.code) !== isUpperCase(piece.code)
    ) {
        const leftTakeMove: ISquare = {
            x: leftTakePiece.x,
            y: leftTakePiece.y,
        };
        moves.set(`${leftTakeMove.x}${leftTakeMove.y}`, leftTakeMove);
    }

    const right = newPlace(piece, 1, 1);
    const rightTakePiece = otherPieces.get(`${right.x}${right.y}`);
    const hasRightTake = right.y <= 8 && rightTakePiece !== undefined;
    if (
        hasRightTake &&
        isUpperCase(rightTakePiece.code) !== isUpperCase(piece.code)
    ) {
        const rightTakeMove: ISquare = {
            x: rightTakePiece.x,
            y: rightTakePiece.y,
        };
        moves.set(`${rightTakeMove.x}${rightTakeMove.y}`, rightTakeMove);
    }
    return moves;
};
export const useMoves = () => {
    const possibleMoves = (
        piece: IPiece,
        otherPieces: Map<string, IPiece>,
    ): Map<string, ISquare> => {
        if (!piece) {
            throw new Error(
                "The piece is undefined, there is not any moves to verify",
            );
        }

        if (!isPieceCodeValid(piece.code)) {
            throw new Error(`The piece code: "${piece.code}" does not exists`);
        }

        if (piece.code.toLowerCase() === "p") {
            return pawn(piece, otherPieces);
        }
        return new Map();
    };
    return {
        possibleMoves,
    };
};
