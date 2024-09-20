import { CanvasElement } from "@/interfaces";

export const drawElement = (
	ctx: CanvasRenderingContext2D | undefined | null,
	element: CanvasElement,
) => {
	if (!ctx) return;

	if (element.type === "pencil") {
		console.log("Drawing pencil", element);
		ctx.strokeStyle = element.color;
		ctx.lineWidth = element.width;
		ctx.beginPath(); // Inicia un nuevo trazo
		ctx.moveTo(element.x, element.y); // Mueve a las coordenadas iniciales
		ctx.lineTo(element.x2, element.y2); // Traza hasta las coordenadas finales
		ctx.stroke(); // Realiza el trazo
		ctx.closePath(); // Cierra
	}
};
