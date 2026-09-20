import { IPiece, isPieceCodeValid } from "@/interfaces/Piece";

export const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

export const convertFenInPieces = (fen: string) => {
    const rows = fen.split("/");

    if (rows.length !== 8) {
        throw new Error(`the FEN code: ${fen} might be incorrect`);
    }

    const pieces: IPiece[] = [];

    let counter = 0;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            const rowPiece = rows[i][j];
            const isAnEmptySquare = /[0-9]/g.test(rowPiece);
            if (isAnEmptySquare) {
                const skipedRows = parseInt(rowPiece, 10);
                counter += skipedRows;
                continue;
            }
            if (!isPieceCodeValid(rowPiece)) {
                throw new Error(`the piece "${rowPiece}" is ont a valid piece`);
            }
            const piece: IPiece = {
                code: rowPiece,
                id: counter++,
                movementsMade: 0,
                y: 8 - i,
                x: String.fromCharCode(97 + j),
            };
            pieces.push(piece);
        }
    }
    console.log(pieces);
    return pieces;
};
