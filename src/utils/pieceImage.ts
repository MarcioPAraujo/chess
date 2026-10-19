import { PieceCodeType } from "@/interfaces/Piece";

const baseBlackUrl = "/black/";
const baseWhiteUrl = "/white/";

const images = {
    pawn: "pawn.png",
    bishop: "bishop.png",
    king: "king.png",
    rook: "rook.png",
    queen: "queen.png",
    knight: "knight.png",
};

export const pieceImage: Record<PieceCodeType, string> = {
    P: `${baseWhiteUrl}${images.pawn}`,
    Q: `${baseWhiteUrl}${images.queen}`,
    K: `${baseWhiteUrl}${images.king}`,
    B: `${baseWhiteUrl}${images.bishop}`,
    R: `${baseWhiteUrl}${images.rook}`,
    N: `${baseWhiteUrl}${images.knight}`,

    p: `${baseBlackUrl}${images.pawn}`,
    q: `${baseBlackUrl}${images.queen}`,
    k: `${baseBlackUrl}${images.king}`,
    n: `${baseBlackUrl}${images.knight}`,
    b: `${baseBlackUrl}${images.bishop}`,
    r: `${baseBlackUrl}${images.rook}`,
};
