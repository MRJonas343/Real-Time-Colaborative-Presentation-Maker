import { MouseEvent, RefObject } from "react";
import { initialState } from "..";
import { clearCanvas } from "./clearCanvas";
import { drawElement } from "@/Services";

export const onMouseMove = (
	e: MouseEvent<HTMLCanvasElement>,
	state: typeof initialState,
	canvasRef: RefObject<HTMLCanvasElement>,
	ctx: CanvasRenderingContext2D | undefined | null,
) => {
	if (!state.isDrawing || !canvasRef.current) return;

	if (state.editorMode === "rectangle") {
		const rect = canvasRef.current.getBoundingClientRect();
		const x2 = e.clientX - (rect.left || 0);
		const y2 = e.clientY - (rect.top || 0);
		clearCanvas(ctx, canvasRef, state.drawnElements, drawElement);

		//* Drow previous elements
		for (const element of state.drawnElements) drawElement(ctx, element);

		const width = x2 - state.startX;
		const height = y2 - state.startY;

		drawElement(ctx, {
			x: state.startX,
			y: state.startY,
			x2: x2,
			y2: y2,
			width: width,
			height: height,
			color: "white",
			type: "rectangle",
		});
	}

	if (state.editorMode === "circle") {
		const rect = canvasRef.current.getBoundingClientRect();
		const x2 = e.clientX - (rect.left || 0);
		const y2 = e.clientY - (rect.top || 0);

		clearCanvas(ctx, canvasRef, state.drawnElements, drawElement);
		const radius = Math.sqrt(
			(x2 - state.startX) ** 2 + (y2 - state.startY) ** 2,
		);

		drawElement(ctx, {
			x: state.startX,
			y: state.startY,
			radius: radius,
			x2: x2,
			y2: y2,
			color: "white",
			type: "circle",
		});
	}
};
