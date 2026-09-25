import { IPiece, isPieceCodeValid } from "@/interfaces/Piece";
import { ISquare } from "@/interfaces/Square";

export const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

export const convertFenInPieces = (fen: string): Map<string, IPiece> => {
    const rows = fen.split("/");

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
                throw new Error(`the piece "${rowPiece}" is ont a valid piece`);
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

export const convertPiecesInFen = (
    pieces: Map<string, IPiece>,
    boardSquares: ISquare[][],
): string => {
    let emptySquares = 0;
    let fen = "";

    boardSquares.forEach((row) => {
        row.forEach((square) => {
            const piece = pieces.get(`${square.x}${square.y}`);

            if (!piece) {
                emptySquares++;
            } else {
                if (emptySquares > 0) {
                    fen += emptySquares;
                    emptySquares = 0;
                }
                fen += piece.code;
            }
            // TODO: add a logic to add the slash "/" separator
        });
    });

    return fen;
};
