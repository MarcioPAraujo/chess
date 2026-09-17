"use client";

import { ISquare } from "@/interfaces/Square";
import React from "react";
import styles from "./board.module.css";

const boardSquares: ISquare[][] = Array.from({ length: 8 }, (_, i) => {
    return Array.from({ length: 8 }, (_, j) => {
        return {
            color: (i + j) % 2 === 0 ? "white" : "black",
            xCoordinate: String.fromCharCode(97 + j),
            yCoordinate: 8 - i,
        };
    });
});

const xCoordinates = Array.from({ length: 8 }, (_, i) => i + 1);
const yCoordinates = Array.from({ length: 8 }, (_, i) =>
    String.fromCharCode(97 + i),
);

function Board() {
    return (
        <div className={styles.board}>
            {boardSquares.map((board, idx) => (
                <div key={idx} className={`${styles.row}`}>
                    <div className={styles.xcoor}>{idx + 1}</div>
                    {board.map((square) => (
                        <div
                            key={`${square.xCoordinate}${square.yCoordinate}`}
                            className={`${styles.square} ${styles[square.color]} ${square.xCoordinate}${square.yCoordinate}`}
                        ></div>
                    ))}
                </div>
            ))}
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
