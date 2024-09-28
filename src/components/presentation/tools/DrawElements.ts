import { CanvasElement } from "@/interfaces";

export const drawElement = (
	ctx: CanvasRenderingContext2D | undefined | null,
	element: CanvasElement,
) => {
	if (!ctx) return;

	ctx.fillStyle = element.fillColor || "transparent";

	if (element.type === "text" && element.content) {
		ctx.fillStyle = element.color;

		const defaultFontSize = 16;
		const lineHeight = 20;

		const lines = element.content.split("\n");

		lines.forEach((line, index) => {
			let font = `${defaultFontSize}px Arial`;
			let text = line;

			if (line.includes("###")) {
				font = "bold 16px Arial";
				text = line.replace("###", "");
			} else if (line.includes("##")) {
				font = "bold 20px Arial";
				text = line.replace("##", "");
			} else if (line.includes("#")) {
				font = "bold 30px Arial";
				text = line.replace("#", "");
			} else if (line.startsWith("*") && line.endsWith("*")) {
				font = "italic 16px Arial";
				text = line.replace(/\*/g, "");
			} else if (line.startsWith("-")) {
				font = "16px Arial";
				text = `⚪${line.replace("-", "")}`;
			}

			ctx.font = font;
			ctx.fillText(text, element.x, element.y + index * lineHeight);
		});

		return;
	}

	if (element.type === "rectangle") {
		const width = element.x2 - element.x;
		const height = element.y2 - element.y;

		if (element.rotation) {
			ctx.save();
			const centerX = element.x + width / 2;
			const centerY = element.y + height / 2;
			ctx.translate(centerX, centerY);
			ctx.rotate(element.rotation);
			ctx.translate(-centerX, -centerY);
		}

		ctx.strokeStyle = element.color;
		ctx.beginPath();
		ctx.rect(element.x, element.y, width, height);

		if (element.fillColor) {
			ctx.fill();
		}

		ctx.stroke();

		if (element.rotation) {
			ctx.restore();
		}
	}

	if (element.type === "circle") {
		ctx.strokeStyle = element.color;
		ctx.beginPath();
		ctx.arc(element.x, element.y, element.radius ?? 0, 0, Math.PI * 2);

		if (element.fillColor) {
			ctx.fill();
		}

		ctx.stroke();
	}

	if (element.type === "arrow") {
		if (element.rotation) {
			ctx.save();

			const midX = (element.x + element.x2) / 2;
			const midY = (element.y + element.y2) / 2;
			ctx.translate(midX, midY);
			ctx.rotate(element.rotation);
			ctx.translate(-midX, -midY);
		}

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

		if (element.rotation) {
			ctx.restore();
		}
	}
};
