"use client";

import { ISquare } from "@/interfaces/Square";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./piece.module.css";
import { usePiecesProvider } from "@/hooks/usePieces";
import { IPiece } from "@/interfaces/Piece";
import { isLowerCase } from "@/utils/verifyCase";

interface IPieceProps {
    square: ISquare;
    onClick: Dispatch<SetStateAction<IPiece | undefined>>;
}

function Piece({ square, onClick }: IPieceProps) {
    const { pieces, turn } = usePiecesProvider();
    const piece = pieces.get(`${square.x}${square.y}`);
    if (piece === undefined) {
        return null;
    }

    const isBlack = isLowerCase(piece.code);
    const styleColor = isBlack ? styles.black : styles.white;

    const isDisabled = (turn === "b" && !isBlack) || (turn === "w" && isBlack);

    if (isDisabled) {
        return (
            <div className={`${styles.piece} ${styleColor} ${styles.disabled}`}>
                {pieces.get(`${square.x}${square.y}`)?.code}
            </div>
        );
    }

    return (
        <button
            type="button"
            disabled={(turn === "b" && !isBlack) || (turn === "w" && isBlack)}
            className={`${styles.piece} ${styleColor}`}
            onClick={() => {
                onClick(piece);
            }}
        >
            {pieces.get(`${square.x}${square.y}`)?.code}
        </button>
    );
}

export default Piece;
