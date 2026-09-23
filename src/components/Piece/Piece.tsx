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
    const { pieces } = usePiecesProvider();
    const piece = pieces.get(`${square.x}${square.y}`);
    if (piece === undefined) {
        return null;
    }

    const styleColor = isLowerCase(piece.code) ? styles.black : styles.white;

    return (
        <button
            type="button"
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
