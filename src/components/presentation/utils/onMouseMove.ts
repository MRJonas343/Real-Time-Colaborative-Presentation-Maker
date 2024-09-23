import { MouseEvent, RefObject } from "react";
import { clearCanvas, drawElement } from ".";
import { initialState } from "..";

export const onMouseMove = (
	e: MouseEvent<HTMLCanvasElement>,
	state: typeof initialState,
	canvasRef: RefObject<HTMLCanvasElement>,
	ctx: CanvasRenderingContext2D | undefined | null,
) => {
	if (!state.isDrawing || !canvasRef.current || !ctx) return;

	const rect = canvasRef.current.getBoundingClientRect();
	const x2 = e.clientX - (rect.left || 0);
	const y2 = e.clientY - (rect.top || 0);
	const width = x2 - state.startX;
	const height = y2 - state.startY;
	const radius = Math.sqrt((x2 - state.startX) ** 2 + (y2 - state.startY) ** 2);

	clearCanvas(ctx, canvasRef, state.drawnElements, drawElement);

	drawElement(ctx, {
		id: "0",
		x: state.startX,
		y: state.startY,
		x2: x2,
		y2: y2,
		radius: radius,
		width: width,
		height: height,
		color: state.selectedStrokeColor,
		type: state.editorMode,
	});
};
