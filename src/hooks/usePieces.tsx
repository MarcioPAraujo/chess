/* eslint-disable react-hooks/exhaustive-deps */
import { IPiece } from "@/interfaces/Piece";
import { ISquare } from "@/interfaces/Square";
import {
    convertFenInPieces,
    convertPiecesInFen,
    DEFAULT_FEN,
} from "@/utils/FEN";
import {
    Context,
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from "react";
import { useBoard } from "./useBoard";
import { isUpperCase } from "@/utils/verifyCase";
import { ICastling } from "@/interfaces/Castling";

export type TurnType = "w" | "b";

interface IChildrenProps {
    children: ReactNode;
}

interface IBoardStatus {
    fen: string;
    pieces: Map<string, IPiece>;
    movePiece: (piece: IPiece, newSquare: ISquare) => void;
    turn: TurnType;
}

const initialBoard: IBoardStatus = {
    pieces: convertFenInPieces(DEFAULT_FEN),
    fen: DEFAULT_FEN,
    movePiece: () => {},
    turn: "w",
};

const PieceContext: Context<IBoardStatus> = createContext(initialBoard);

const DEFAULT_CASTLING: ICastling = {
    K: true,
    Q: true,
    k: true,
    q: true,
};

export const PiecesProvider: React.FC<IChildrenProps> = ({ children }) => {
    const { boardSquares } = useBoard();
    const [fen, setFen] = useState<string>(DEFAULT_FEN);
    const [pieces, setPieces] = useState<Map<string, IPiece>>(
        convertFenInPieces(DEFAULT_FEN),
    );
    // Counts moves since the last pawn advance or capture.
    const [halfmoveClock, setHalfmoveClock] = useState<number>(0);
    const [turn, setTurn] = useState<TurnType>("w");
    const [castling, setCastling] = useState<ICastling>(DEFAULT_CASTLING);

    const updateCastlingRights = (castlingFen: string) => {
        const castlingRights = Object.keys(castling).reduce(
            (acc: ICastling, key) => {
                acc[key as keyof ICastling] = castlingFen.includes(key);
                return acc;
            },
            DEFAULT_CASTLING,
        );
        setCastling(castlingRights);
    };

    const movePiece = (piece: IPiece, newSquare: ISquare) => {
        const isWhitePiece = isUpperCase(piece.code);
        const piecesCopy = new Map(pieces);

        // capture verification
        const hasPieceInTheNewSquare = piecesCopy.get(
            `${newSquare.x}${newSquare.y}`,
        );
        if (hasPieceInTheNewSquare) {
            piecesCopy.delete(`${newSquare.x}${newSquare.y}`);
        }

        // halfmove clock rule verification
        let halfmove = halfmoveClock;
        if (piece.code.toLowerCase() === "p" || !hasPieceInTheNewSquare) {
            halfmove++;
            setHalfmoveClock(halfmove);
        }

        // updates the position of the moved piece
        const newPosition: IPiece = {
            ...piece,
            movementsMade: piece.movementsMade + 1,
            x: newSquare.x,
            y: newSquare.y,
        };
        piecesCopy.delete(`${piece.x}${piece.y}`);
        piecesCopy.set(`${newPosition.x}${newPosition.y}`, newPosition);

        // fen update
        const newFen = convertPiecesInFen({
            pieces: piecesCopy,
            boardSquares,
            halfmoveCLock: halfmove,
            pieceMoved: piece,
            castlingRights: castling,
        });

        // catling rughts check
        const newCastlingRights = newFen.split(" ")[2];
        const oldCastlingRights = fen.split(" ")[2];

        if (newCastlingRights !== oldCastlingRights) {
            updateCastlingRights(newCastlingRights);
        }

        setTurn(isWhitePiece ? "b" : "w");
        setFen(newFen);
        setPieces(piecesCopy);
    };

    const board: IBoardStatus = useMemo(() => {
        return {
            fen,
            pieces,
            turn,
            movePiece,
        };
    }, [fen, pieces, turn]);

    return (
        <PieceContext.Provider value={board}>{children}</PieceContext.Provider>
    );
};

export const usePiecesProvider = (): IBoardStatus => {
    const context = useContext(PieceContext);
    if (!context) {
        throw new Error(
            "the piece context must be used within a piece provider",
        );
    }
    return context;
};
