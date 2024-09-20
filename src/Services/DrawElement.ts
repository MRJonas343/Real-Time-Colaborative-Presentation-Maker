import { CanvasElement } from "@/interfaces";

export const drawElement = (
	ctx: CanvasRenderingContext2D | undefined | null,
	element: CanvasElement,
) => {
	if (!ctx) return;

	if (element.type === "rect") {
		ctx.fillStyle = element.color;
		ctx.fillRect(element.x, element.y, element.width, element.height);
	}
};
