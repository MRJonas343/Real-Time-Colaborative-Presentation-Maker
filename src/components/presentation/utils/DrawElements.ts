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

	if (element.type === "circle") {
		if (!element.radius) return;

		ctx.strokeStyle = element.color;
		ctx.beginPath();
		ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
		ctx.stroke();
	}

	if (element.type === "arrow") {
		ctx.strokeStyle = element.color;
		ctx.beginPath();
		ctx.moveTo(element.x, element.y);
		ctx.lineTo(element.x2, element.y2);
		ctx.stroke();

		const headLength = 10;
		const angle = Math.atan2(element.y2 - element.y, element.x2 - element.x);

		ctx.beginPath();
		ctx.moveTo(element.x2, element.y2);
		ctx.lineTo(
			element.x2 - headLength * Math.cos(angle - Math.PI / 6),
			element.y2 - headLength * Math.sin(angle - Math.PI / 6),
		);

		ctx.moveTo(element.x2, element.y2);
		ctx.lineTo(
			element.x2 - headLength * Math.cos(angle + Math.PI / 6),
			element.y2 - headLength * Math.sin(angle + Math.PI / 6),
		);
		ctx.stroke();
	}
};
