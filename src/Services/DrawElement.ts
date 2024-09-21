import { CanvasElement } from "@/interfaces";

export const drawElement = (
	ctx: CanvasRenderingContext2D | undefined | null,
	element: CanvasElement,
) => {
	if (!ctx) return;

	if (element.type === "rectangle") {
		const width = element.x2 - element.x;
		const height = element.y2 - element.y;
		ctx.strokeStyle = element.color;
		ctx.beginPath();
		ctx.rect(element.x, element.y, width, height);
		ctx.stroke();
	}
};
