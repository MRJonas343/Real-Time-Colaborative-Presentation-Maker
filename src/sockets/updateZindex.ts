import { socket } from "@/constants";
import { CanvasElement } from "@/interfaces";

export const updateZindex = (
	elements: CanvasElement[],
	currentSlide: number,
	presentationId: string,
) => {
	socket.emit("updateZindex", {
		elements: elements,
		presentationId: presentationId,
		currentSlide: currentSlide,
	});
};
