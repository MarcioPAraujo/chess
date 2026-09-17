"use client";

import { ISquare } from "@/interfaces/Square";
import React from "react";
import styles from "./board.module.css";

const boardSquares: ISquare[][] = Array.from({ length: 8 }, (_, i) => {
    return Array.from({ length: 8 }, (_, j) => {
        return {
            color: (i + j) % 2 === 0 ? "white" : "black",
            x: String.fromCharCode(97 + j),
            y: 8 - i,
        };
    });
});

const yCoordinates = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode(97 + i),
);

// TODO receive an array of pieces, and render them on the matched coordinate

function Board() {
    return (
        <div className={styles.board}>
            {boardSquares.map((board, idx) => (
                <div key={idx} className={`${styles.row}`}>
                    {/* x - coordinates */}
                    <div className={styles.xcoor}>{idx + 1}</div>
                    {/* board squares */}
                    {board.map((square) => (
                        <div
                            key={`${square.x}${square.y}`}
                            className={`${styles.square} ${styles[square.color]} ${square.x}${square.y}`}
                        ></div>
                    ))}
                </div>
            ))}
            {/* y coordinates */}
            <div className={styles.row}>
                {yCoordinates.map((coor) => (
                    <div
                        key={crypto.randomUUID()}
                        className={`${styles.ycoor}`}
                    >
                        {coor}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;
