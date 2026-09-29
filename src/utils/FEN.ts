import { IPiece, isPieceCodeValid } from "@/interfaces/Piece";
import { ISquare } from "@/interfaces/Square";

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

export const convertPiecesInFen = (
    pieces: Map<string, IPiece>,
    boardSquares: ISquare[][],
): string => {
    let emptySquares = 0;
    let fen = "";

    let moventsMade = 0;
    const castlingRights = {
        K: false,
        Q: false,
        k: false,
        q: false,
    };

    boardSquares.forEach((row) => {
        row.forEach((square) => {
            const piece = pieces.get(`${square.x}${square.y}`);
            if (piece === undefined) {
                //TODO: check for empty squares that start in a row and ends on the next row
                if (emptySquares === 8) {
                    fen += "8";
                    emptySquares = 0;
                }
                emptySquares++;
                return;
            }
            if (emptySquares > 0) {
                fen += emptySquares;
                emptySquares = 0;
            }
            fen += piece.code;

            moventsMade += piece.movementsMade;
        });
    });

    const turn = moventsMade % 2 === 0 ? "w" : "b";

    const letters = fen.split("");
    let formattedFen = "";
    let row = "";
    let rowLength = 0;
    console.log(fen);
    letters.forEach((letter) => {
        const isLetter = /[^0-9]/g.test(letter);
        if (rowLength === 8) {
            rowLength = 0;
            formattedFen += `${row}/`;
            row = "";
        }
        if (isLetter) {
            row += letter;
            rowLength++;
            return;
        }
        const remainingSpaces = 8 - rowLength;
        const empty = parseInt(letter, 10);
        if (remainingSpaces >= empty) {
            rowLength += empty;
            formattedFen += `${row}${letter}`;
            row = "";
            return;
        }
        const rest = empty - remainingSpaces;
        rowLength += remainingSpaces;
        row += `${letter}/`;
        formattedFen += row;
        row = `${rest}`;
        rowLength = rest;
    });
    if (row.length > 0) {
        formattedFen += row;
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

    return `${formattedFen} ${turn} ${castling}`;
};
