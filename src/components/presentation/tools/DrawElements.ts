import { CanvasElement } from "@/interfaces";

export const drawElement = (
	ctx: CanvasRenderingContext2D | undefined | null,
	element: CanvasElement,
) => {
	if (!ctx) return;

	ctx.fillStyle = element.fillColor || "transparent";

	if (element.type === "rectangle") {
		const width = element.x2 - element.x;
		const height = element.y2 - element.y;

		// Aplicar la rotación solo para rectángulos
		if (element.rotation) {
			ctx.save();
			// Trasladar al centro del rectángulo antes de rotar
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

		// Restaurar el contexto si se aplicó rotación
		if (element.rotation) {
			ctx.restore();
		}
	}

	if (element.type === "circle") {
		// Los círculos no rotan, se dibujan normalmente
		if (!element.radius) return;

		ctx.strokeStyle = element.color;
		ctx.beginPath();
		ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);

		if (element.fillColor) {
			ctx.fill();
		}

		ctx.stroke();
	}

	if (element.type === "arrow") {
		// Aplicar rotación solo para flechas
		if (element.rotation) {
			ctx.save();
			// Trasladar al punto medio de la flecha antes de rotar
			const midX = (element.x + element.x2) / 2;
			const midY = (element.y + element.y2) / 2;
			ctx.translate(midX, midY);
			ctx.rotate(element.rotation);
			ctx.translate(-midX, -midY);
		}

		// Dibuja la línea de la flecha
		ctx.strokeStyle = element.color;
		ctx.beginPath();
		ctx.moveTo(element.x, element.y);
		ctx.lineTo(element.x2, element.y2);
		ctx.stroke();

		// Dibuja la punta de la flecha
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

		// Restaurar el contexto si se aplicó rotación
		if (element.rotation) {
			ctx.restore();
		}
	}
};
