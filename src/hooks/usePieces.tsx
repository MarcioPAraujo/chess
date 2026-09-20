import { IPiece } from "@/interfaces/Piece";
import { convertFenInPieces, DEFAULT_FEN } from "@/utils/FEN";
import { Context, createContext, ReactNode, useContext, useMemo } from "react";

interface IChildrenProps {
    children: ReactNode;
}

interface IBoardStatus {
    fen: string;
    pieces: Map<string, IPiece>;
}

const parsePiecesToMap = (pieces: IPiece[]): Map<string, IPiece> => {
    const piecesMap: Map<string, IPiece> = new Map();

    pieces.forEach((piece) => {
        piecesMap.set(`${piece.x}${piece.y}`, piece);
    });

    return piecesMap;
};

const initialBoard: IBoardStatus = {
    pieces: parsePiecesToMap(convertFenInPieces(DEFAULT_FEN)),
    fen: DEFAULT_FEN,
};

const PieceContext: Context<IBoardStatus> = createContext(initialBoard);

export const PiecesProvider: React.FC<IChildrenProps> = ({ children }) => {
    const board: IBoardStatus = useMemo(() => initialBoard, []);

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
