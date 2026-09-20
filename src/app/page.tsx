"use client";

import Board from "@/components/board/Board";
import { PiecesProvider } from "@/hooks/usePieces";

export default function Home() {
    return (
        <PiecesProvider>
            <div>
                <Board />
            </div>
        </PiecesProvider>
    );
}
