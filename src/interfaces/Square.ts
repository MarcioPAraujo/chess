import { ICoordinate } from "./Coordinate";

export interface ISquare extends ICoordinate {
    id: number;
    color: "white" | "black";
}
