import { EditorModes } from ".";

export type CanvasElement = {
	id: string;
	x: number;
	y: number;
	x2: number;
	y2: number;
	radius: number;
	width: number;
	height: number;
	color: string;
	type: EditorModes;
};
