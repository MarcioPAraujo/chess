"use client";

import { ISquare } from "@/interfaces/Square";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./piece.module.css";
import { usePiecesProvider } from "@/hooks/usePieces";
import { IPiece } from "@/interfaces/Piece";
import { isLowerCase } from "@/utils/verifyCase";
import { pieceImage } from "@/utils/pieceImage";
import Image from "next/image";

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

    const isDisabled = (turn === "b" && !isBlack) || (turn === "w" && isBlack);

    const renderedPiece = pieces.get(`${square.x}${square.y}`)?.code;

    return (
        <div
            className={`${styles.piece} ${isDisabled ? styles.disabled : ""}`}
            onClick={() => {
                if (isDisabled) return;
                onClick(piece);
            }}
        >
            {renderedPiece && (
                <Image
                    src={pieceImage[renderedPiece]}
                    alt=""
                    width={60}
                    height={60}
                />
            )}
        </div>
    );
}

export default Piece;
