"use client";

import React, { useState } from "react";
import styles from "./board.module.css";
import Piece from "@/components/Piece/Piece";
import { useBoard } from "@/hooks/useBoard";
import { IPiece } from "@/interfaces/Piece";
import PossibleMoves from "../PossibleMoves/PossibleMoves";

function Board() {
    const { boardSquares, xCoordinates } = useBoard();
    const [selectedPiece, setSelectedPiece] = useState<IPiece | undefined>();

    return (
        <div className={styles.board}>
            {boardSquares.map((board, i) => (
                <div key={i} className={`${styles.row}`}>
                    {/* y - coordinates */}
                    <div className={styles.ycoor}>{8 - i}</div>
                    {/* board squares */}
                    {board.map((square, j) => (
                        <div
                            key={`${square.x}${square.y}`}
                            className={`${styles.square} ${(i + j) % 2 === 0 ? styles.white : styles.black} ${square.x}${square.y}`}
                        >
                            <PossibleMoves
                                boardSquare={square}
                                selectedPiece={selectedPiece}
                                onClick={() => setSelectedPiece(undefined)}
                            />
                            <Piece square={square} onClick={setSelectedPiece} />
                        </div>
                    ))}
                </div>
            ))}
            {/* x coordinates */}
            <div className={styles.row} style={{ marginLeft: "1.25rem" }}>
                {xCoordinates.map((coor) => (
                    <div
                        key={crypto.randomUUID()}
                        className={`${styles.xcoor}`}
                    >
                        {coor}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;
