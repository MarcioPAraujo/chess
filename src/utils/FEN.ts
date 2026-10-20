import { ICastling } from "@/interfaces/Castling";
import { IPiece, isPieceCodeValid } from "@/interfaces/Piece";
import { ISquare } from "@/interfaces/Square";

interface IPiecesInFen {
    pieces: Map<string, IPiece>;
    boardSquares: ISquare[][];
    halfmoveCLock: number;
    pieceMoved: IPiece;
    castlingRights: ICastling;
}

export const DEFAULT_FEN =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - - -";

export const convertFenInPieces = (fen: string): Map<string, IPiece> => {
    const fenPiecesPart = fen.split(" ")[0];
    const rows = fenPiecesPart.split("/");

    if (rows.length !== 8) {
        throw new Error(`the FEN code: ${fen} might be incorrect`);
    }

    const pieces: Map<string, IPiece> = new Map();

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            const rowPiece = rows[i][j];
            const isAnEmptySquare = /[0-9]/g.test(rowPiece);
            if (isAnEmptySquare) {
                continue;
            }
            if (!isPieceCodeValid(rowPiece)) {
                throw new Error(`the piece ${rowPiece} is ont a valid piece`);
            }
            const piece: IPiece = {
                code: rowPiece,
                movementsMade: 0,
                y: 8 - i,
                x: j + 1,
            };
            pieces.set(`${piece.x}${piece.y}`, piece);
        }
    }
    return pieces;
};

export const convertPiecesInFen = ({
    boardSquares,
    castlingRights,
    halfmoveCLock,
    pieceMoved,
    pieces,
}: IPiecesInFen): string => {
    let emptySquares = 0;
    let fen = "";
    let row = "";
    let currentRowLength = 0;

    let moventsMade = 0;

    if (pieceMoved.movementsMade > 0) {
        if (pieceMoved.code === "K") {
            castlingRights.K = false;
            castlingRights.Q = false;
        } else if (pieceMoved.code === "k") {
            castlingRights.k = false;
            castlingRights.q = false;
        } else if (pieceMoved.code === "R") {
            const isLeftWhiteHook = pieceMoved.x === 1 && pieceMoved.y === 1;
            const isRightWhiteHook = pieceMoved.x === 8 && pieceMoved.y === 1;
            if (isLeftWhiteHook) {
                castlingRights.Q = false;
            }
            if (isRightWhiteHook) {
                castlingRights.K = false;
            }
        } else if (pieceMoved.code === "r") {
            const isLeftBlackHook = pieceMoved.x === 1 && pieceMoved.y === 8;
            const isRightBlakHook = pieceMoved.x === 8 && pieceMoved.y === 8;
            if (isRightBlakHook) {
                castlingRights.k = false;
            }
            if (isLeftBlackHook) {
                castlingRights.q = false;
            }
        }
    }

    boardSquares.forEach((rowBoard) => {
        rowBoard.forEach((square) => {
            const ROW_LENGTH = 8;
            const remainingSpaces = ROW_LENGTH - currentRowLength;
            if (currentRowLength === ROW_LENGTH) {
                if (emptySquares > 0) {
                    row += `${emptySquares}`;
                }

                fen += `${row}/`;
                currentRowLength = 0;
                row = "";
                emptySquares = 0;
            }
            const piece = pieces.get(`${square.x}${square.y}`);

            if (piece === undefined) {
                emptySquares++;
                currentRowLength++;
                return;
            }

            moventsMade += piece.movementsMade;

            if (emptySquares === 0) {
                row += piece.code;
                currentRowLength++;
                return;
            }
            if (currentRowLength >= ROW_LENGTH) {
                row += `${emptySquares}${piece.code}/`;
                emptySquares -= remainingSpaces;
                currentRowLength = emptySquares;
                emptySquares = 0;
                return;
            }
            row += `${emptySquares}${piece.code}`;
            emptySquares = 0;
            currentRowLength++;
        });
    });

    if (row.length > 0) {
        fen += `${row}/`;
        row = "";
    }

    const castling = Object.entries(castlingRights).reduce(
        (acc: string, [key, value]) => {
            if (value) {
                acc = acc.replace("-", "");
                return `${acc}${key}`;
            }
            return acc;
        },
        "-",
    );

    const turn = moventsMade % 2 === 0 ? "w" : "b";

    return `${fen} ${turn} ${castling} ${halfmoveCLock} ${moventsMade}`;
};
