import { initialState } from "../state";
import { drawElement } from "./DrawElements";

export const canvasZoom = (
	ctx: CanvasRenderingContext2D | undefined | null,
	scale: number,
	state: typeof initialState,
) => {
	ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx?.save();
	ctx?.scale(scale, scale);
	for (const element of state.drawnElements) drawElement(state, ctx, element);

	ctx?.restore();
};
