"use client";

import Board from "@/components/board/Board";
import { PiecesProvider } from "@/hooks/usePieces";
import styles from "./page.module.css";

export default function Home() {
    return (
        <PiecesProvider>
            <div className={styles.container}>
                <Board />
            </div>
        </PiecesProvider>
    );
}
