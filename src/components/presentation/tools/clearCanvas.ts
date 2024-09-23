import { CanvasElement } from "@/interfaces";
import { RefObject } from "react";
import { drawElement } from "./DrawElements";

export const clearCanvas = (
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	elements: CanvasElement[],
) => {
	if (!ctx || !canvasRef.current) return;

	ctx.clearRect(
		0,
		0,
		canvasRef.current.width || 0,
		canvasRef.current.height || 0,
	);

	for (const element of elements) drawElement(ctx, element);
};
