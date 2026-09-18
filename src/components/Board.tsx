"use client";

import { ISquare } from "@/interfaces/Square";
import React from "react";
import styles from "./board.module.css";

let counter = 0;
const boardSquares: ISquare[][] = Array.from({ length: 8 }, (_, i) => {
    return Array.from({ length: 8 }, (_, j) => {
        return {
            id: counter++,
            color: (i + j) % 2 === 0 ? "white" : "black",
            x: String.fromCharCode(97 + j),
            y: 8 - i,
        };
    });
});

const xCoordinates = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode(97 + i),
);

// TODO receive an array of pieces, and render them on the matched coordinate

function Board() {
    return (
        <div className={styles.board}>
            {boardSquares.map((board, idx) => (
                <div key={idx} className={`${styles.row}`}>
                    {/* y - coordinates */}
                    <div className={styles.ycoor}>{idx + 1}</div>
                    {/* board squares */}
                    {board.map((square) => (
                        <div
                            key={`${square.x}${square.y}`}
                            className={`${styles.square} ${styles[square.color]} ${square.x}${square.y}`}
                        ></div>
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
