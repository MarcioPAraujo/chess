"use client";

import { ISquare } from "@/interfaces/Square";
import React from "react";
import styles from "./piece.module.css";
import { usePiecesProvider } from "@/hooks/usePieces";

interface IPieceProps {
    square: ISquare;
}

function Piece({ square }: IPieceProps) {
    const { pieces } = usePiecesProvider();
    if (pieces.get(`${square.x}${square.y}`) === undefined) {
        return null;
    }
    return (
        <button type="button" className={styles.piece}>
            {pieces.get(`${square.x}${square.y}`)?.code}
        </button>
    );
}

export default Piece;
