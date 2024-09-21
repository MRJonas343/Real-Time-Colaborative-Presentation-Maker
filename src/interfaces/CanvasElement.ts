import { EditorModes } from ".";

export type CanvasElement = {
	x: number;
	y: number;
	x2: number;
	y2: number;
	width: number;
	height?: number;
	color: string;
	type: EditorModes;
};
