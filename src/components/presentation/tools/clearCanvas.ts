import { CanvasElement } from "@/interfaces";
import { RefObject } from "react";
import { drawElement } from "./DrawElements";
import { initialState } from "../state";

export const clearCanvas = (
	state: typeof initialState,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	elements: CanvasElement[],
) => {
	if (!ctx) return;

	ctx.clearRect(
		0,
		0,
		canvasRef.current?.width || 0,
		canvasRef.current?.height || 0,
	);

	for (const element of elements) drawElement(state, ctx, element);
};
