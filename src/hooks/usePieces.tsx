/* eslint-disable react-hooks/exhaustive-deps */
import { IPiece } from "@/interfaces/Piece";
import { ISquare } from "@/interfaces/Square";
import { convertFenInPieces, DEFAULT_FEN } from "@/utils/FEN";
import {
    Context,
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from "react";

interface IChildrenProps {
    children: ReactNode;
}

interface IBoardStatus {
    fen: string;
    pieces: Map<string, IPiece>;
    movePiece: (piece: IPiece, newSquare: ISquare) => void;
}

const parsePiecesToMap = (pieces: IPiece[]): Map<string, IPiece> => {
    const piecesMap: Map<string, IPiece> = new Map();

    pieces.forEach((piece) => {
        piecesMap.set(`${piece.x}${piece.y}`, piece);
    });
    console.log(piecesMap);
    return piecesMap;
};

const initialBoard: IBoardStatus = {
    pieces: parsePiecesToMap(convertFenInPieces(DEFAULT_FEN)),
    fen: DEFAULT_FEN,
    movePiece: () => {},
};

const PieceContext: Context<IBoardStatus> = createContext(initialBoard);

export const PiecesProvider: React.FC<IChildrenProps> = ({ children }) => {
    const [fen, setFen] = useState<string>(DEFAULT_FEN);
    const [pieces, setPieces] = useState<Map<string, IPiece>>(
        parsePiecesToMap(convertFenInPieces(fen)),
    );

    const movePiece = (piece: IPiece, newSquare: ISquare) => {
        const newPosition: IPiece = {
            ...piece,
            movementsMade: piece.movementsMade + 1,
            x: newSquare.x,
            y: newSquare.y,
        };
        pieces.delete(`${piece.x}${piece.y}`);
        pieces.set(`${newPosition.x}${newPosition.y}`, newPosition);
        setPieces(pieces);
    };

    const board: IBoardStatus = useMemo(() => {
        return {
            fen,
            pieces,
            movePiece,
        };
    }, [fen, pieces]);

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
