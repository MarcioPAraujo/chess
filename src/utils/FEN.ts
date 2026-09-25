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
    let fenRow = "";

    boardSquares.forEach((row) => {
        row.forEach((square) => {
            const piece = pieces.get(`${square.x}${square.y}`);
            if (!piece) {
                emptySquares++;
            } else {
                const emptySpaces = fenRow.replace(/[^0-9]/g, "").split("");
                const totalEmptySpaces = emptySpaces.reduce(
                    (acc: number, current) => {
                        const numericAcc = parseInt(current, 10);
                        if (isNaN(numericAcc)) {
                            return acc;
                        }
                        return numericAcc + acc;
                    },
                    0,
                );

                const rowPieces = fenRow.replace(/[0-9]/g, "").length;

                if (totalEmptySpaces + rowPieces === 8) {
                    fenRow += "/";
                    fen += fenRow;
                    fenRow = "";
                }
                if (emptySquares > 0) {
                    fenRow += emptySquares;
                    emptySquares = 0;
                }
                fenRow += piece.code;
            }
        });
    });

    return fen;
};
