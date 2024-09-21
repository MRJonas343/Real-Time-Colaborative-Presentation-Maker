import { CanvasElement } from "@/interfaces";
import { RefObject } from "react";

export const clearCanvas = (
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	elements: CanvasElement[],
	drawElement: (
		ctx: CanvasRenderingContext2D | undefined | null,
		element: CanvasElement,
	) => void,
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
