import { socket } from "@/constants";

export const deleteCanvasElement = (
	presentationId: string,
	elementId: string,
	slidePosition: number,
) => {
	socket.emit("deleteElement", { presentationId, elementId, slidePosition });
};
