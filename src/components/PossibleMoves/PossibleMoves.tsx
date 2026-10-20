"use client";

import { useMoves } from "@/hooks/useMoves";
import { usePiecesProvider } from "@/hooks/usePieces";
import { IPiece } from "@/interfaces/Piece";
import { ISquare } from "@/interfaces/Square";
import { FC, ReactNode } from "react";
import styles from "./possiblemoves.module.css";

interface IPossibleMovesProps {
    selectedPiece: IPiece | undefined;
    boardSquare: ISquare;
    onClick: VoidFunction;
    piece?: ReactNode;
}

const PossibleMoves: FC<IPossibleMovesProps> = ({
    selectedPiece,
    boardSquare,
    onClick,
    piece,
}) => {
    const { possibleMoves } = useMoves();
    const { pieces, movePiece } = usePiecesProvider();
    if (selectedPiece === undefined) return <>{piece}</>;

    if (
        selectedPiece.movementsMade > 0 &&
        selectedPiece.possibleMoves.get(`${boardSquare.x}${boardSquare.y}`) ===
            undefined
    ) {
        return <>{piece}</>;
    }
    if (selectedPiece.movementsMade === 0) {
        const moves = possibleMoves(selectedPiece, pieces);
        if (moves.get(`${boardSquare.x}${boardSquare.y}`) === undefined) {
            return <>{piece}</>;
        }
    }

    const takeStyle =
        pieces.get(`${boardSquare.x}${boardSquare.y}`) !== undefined
            ? styles.take
            : "";

    return (
        <div
            className={`${styles.possibleMove} ${takeStyle}`}
            onClick={() => {
                movePiece(selectedPiece, boardSquare);
                onClick();
            }}
        >
            {piece}
        </div>
    );
};
export default PossibleMoves;
