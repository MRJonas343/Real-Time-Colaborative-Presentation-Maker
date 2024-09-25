import { initialState } from "..";

export const getClickedElement = (
	ctx: CanvasRenderingContext2D | undefined | null,
	state: typeof initialState,
	x: number,
	y: number,
) => {
	const clickedElement = state.drawnElements.find((element) => {
		if (element.type === "rectangle") {
			return (
				x >= element.x &&
				x <= element.x + (element.width ?? 0) &&
				y >= element.y &&
				y <= element.y + (element.height ?? 0)
			);
		}

		if (element.type === "circle") {
			const distance = Math.sqrt((x - element.x) ** 2 + (y - element.y) ** 2);
			return distance <= (element.radius ?? 0);
		}

		if (element.type === "arrow") {
			const distance =
				Math.abs(
					(element.y2 - element.y) * x -
						(element.x2 - element.x) * y +
						element.x2 * element.y -
						element.y2 * element.x,
				) /
				Math.sqrt(
					(element.y2 - element.y) ** 2 + (element.x2 - element.x) ** 2,
				);

			const threshold = 5;
			return distance <= threshold;
		}

		if (element.type === "text" && ctx) {
			let fontSize = element.fontSize ?? 16;
			let fontStyle = "normal";

			if (element.content?.includes("###")) {
				fontSize = 16;
				fontStyle = "bold";
			} else if (element.content?.includes("##")) {
				fontSize = 20;
				fontStyle = "bold";
			} else if (element.content?.includes("#")) {
				fontSize = 30;
				fontStyle = "bold";
			}

			ctx.font = `${fontStyle} ${fontSize}px Arial`;
			const lines = (element.content ?? "").split("\n");

			const lineHeight = fontSize * 1.2;
			const margin = 5;

			for (let i = 0; i < lines.length; i++) {
				const textWidth = ctx.measureText(lines[i]).width + margin;
				const textY = element.y + i * lineHeight;

				if (
					x >= element.x - margin &&
					x <= element.x + textWidth &&
					y >= textY - lineHeight &&
					y <= textY + margin
				) {
					return true;
				}
			}
			return false;
		}

		return false;
	});
	return clickedElement;
};
