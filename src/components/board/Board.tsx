"use client";

import { ISquare } from "@/interfaces/Square";
import React from "react";
import styles from "./board.module.css";
import Piece from "../Piece/Piece";

let counter = 0;
const boardSquares: ISquare[][] = Array.from({ length: 8 }, (_, i) => {
    return Array.from({ length: 8 }, (_, j) => {
        return {
            id: counter++,
            x: String.fromCharCode(97 + j),
            y: 8 - i,
        };
    });
});

const xCoordinates = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode(97 + i),
);

function Board() {
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
                            <Piece square={square} />
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
