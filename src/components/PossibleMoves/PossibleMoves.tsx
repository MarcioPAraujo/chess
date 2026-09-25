"use client";

import { useMoves } from "@/hooks/useMoves";
import { usePiecesProvider } from "@/hooks/usePieces";
import { IPiece } from "@/interfaces/Piece";
import { ISquare } from "@/interfaces/Square";
import { FC } from "react";
import styles from "./possiblemoves.module.css";

interface IPossibleMovesProps {
    selectedPiece: IPiece | undefined;
    boardSquare: ISquare;
    onClick: VoidFunction;
}

const PossibleMoves: FC<IPossibleMovesProps> = ({
    selectedPiece,
    boardSquare,
    onClick,
}) => {
    const { possibleMoves } = useMoves();
    const { pieces, movePiece } = usePiecesProvider();
    if (selectedPiece === undefined) return null;

    const moves = possibleMoves(selectedPiece, pieces);

    if (moves.get(`${boardSquare.x}${boardSquare.y}`) === undefined) {
        return null;
    }

    const takeStyle =
        pieces.get(`${boardSquare.x}${boardSquare.y}`) !== undefined
            ? styles.take
            : "";

    return (
        <button
            type="button"
            className={`${styles.possibleMove} ${takeStyle}`}
            onClick={() => {
                movePiece(selectedPiece, boardSquare);
                onClick();
            }}
        />
    );
};
export default PossibleMoves;
