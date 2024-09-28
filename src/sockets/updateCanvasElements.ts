import { socket } from "@/constants";
import { CanvasElement } from "@/interfaces";

export const updateCanvasElements = (
	currentSlide: number,
	newElement: CanvasElement,
	presentationId: string,
) => {
	socket.emit("updateElements", {
		currentSlide: currentSlide,
		newElement: newElement,
		presentationId: presentationId,
	});
};
