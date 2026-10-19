import { IPiece, isPieceCodeValid } from "@/interfaces/Piece";
import { ISquare } from "@/interfaces/Square";
import { isUpperCase } from "@/utils/verifyCase";
/**
 *
 * @param piece piece being moved
 * @param rows number of rows to move (y axis), positive means forward and negative backwards
 * @param columns number of columns moved (x axis), positve means move to right, and negative moves to left
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

const outOfRange = (coordinate: number): boolean => {
    return coordinate > 8 || coordinate < 1;
};
const isEnemyPiece = (
    movedPiece: IPiece,
    otherPiece: IPiece | undefined,
): boolean => {
    if (!otherPiece) return false;
    return isUpperCase(movedPiece.code) !== isUpperCase(otherPiece.code);
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

const knight = (
    piece: IPiece,
    otherPieces: Map<string, IPiece>,
): Map<string, ISquare> => {
    const upRight = newPlace(piece, 2, 1);
    const upLeft = newPlace(piece, 2, -1);
    const downRight = newPlace(piece, -2, 1);
    const downLeft = newPlace(piece, -2, -1);
    const leftUp = newPlace(piece, 1, -2);
    const leftDown = newPlace(piece, -1, -2);
    const rightUp = newPlace(piece, 1, 2);
    const rightDown = newPlace(piece, 1, -2);

    const moves = [
        upLeft,
        upRight,
        downLeft,
        downRight,
        leftDown,
        leftUp,
        rightUp,
        rightDown,
    ];

    const mapMoves: Map<string, ISquare> = new Map();

    moves.forEach((move) => {
        const moveCoor = `${move.x}${move.y}`;
        const hasPieceInMove = otherPieces.get(moveCoor);
        const isFriendPiece =
            hasPieceInMove &&
            isUpperCase(piece.code) === isUpperCase(hasPieceInMove.code);
        if (isFriendPiece) {
            return;
        }
        if (!outOfRange(move.x) && !outOfRange(move.y)) {
            mapMoves.set(moveCoor, move);
        }
    });
    return mapMoves;
};

/**
 *
 * @param piece piece being moved
 * @param otherPieces other pieces on the board
 * @param x the direction of the move in x axis (horizontal), +1 means forward and -1 backwards
 * @param y the direction of teh move in y axis (vertical), +1 means right and -1 left
 * @returns
 */
const rookLinesMoves = (
    piece: IPiece,
    otherPieces: Map<string, IPiece>,
    x = 0,
    y = 0,
): Map<string, ISquare> => {
    if (x < -1 || x > 1) {
        throw new Error("The x coordinate must be -1, 0 or 1");
    }
    if (y < -1 || y > 1) {
        throw new Error("The y coordinate must be -1, 0 or 1");
    }

    const moves: Map<string, ISquare> = new Map();
    let xAxis = x;
    let yAxis = y;
    let move = newPlace(piece, yAxis, xAxis);
    let pieceOnWay = otherPieces.get(`${move.x}${move.y}`);
    // verify the available squares available to move forward
    if (isEnemyPiece(piece, pieceOnWay)) {
        moves.set(`${move.x}${move.y}`, move);
    }
    while (!outOfRange(move.y) && !outOfRange(move.x) && !pieceOnWay) {
        moves.set(`${move.x}${move.y}`, move);
        xAxis = xAxis + x;
        yAxis = yAxis + y;
        move = newPlace(piece, yAxis, xAxis);
        pieceOnWay = otherPieces.get(`${move.x}${move.y}`);

        if (isEnemyPiece(piece, pieceOnWay)) {
            moves.set(`${move.x}${move.y}`, move);
        }
    }
    return moves;
};
const rook = (
    piece: IPiece,
    otherPieces: Map<string, IPiece>,
): Map<string, ISquare> => {
    const forward = rookLinesMoves(piece, otherPieces, 0, 1);
    const backwards = rookLinesMoves(piece, otherPieces, 0, -1);
    const left = rookLinesMoves(piece, otherPieces, -1);
    const right = rookLinesMoves(piece, otherPieces, 1);
    return new Map([...forward, ...backwards, ...left, ...right]);
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
        if (piece.code.toLowerCase() === "n") {
            return knight(piece, otherPieces);
        }
        if (piece.code.toLowerCase() === "r") {
            return rook(piece, otherPieces);
        }
        return new Map();
    };
    return {
        possibleMoves,
    };
};
