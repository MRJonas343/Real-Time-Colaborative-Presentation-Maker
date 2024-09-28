import { socket } from "@/constants";

export const updateSlidesOders = (
	slide1: string,
	slide2: string,
	presentationId: string,
) => {
	socket.emit("updateSlidesPositions", { slide1, slide2, presentationId });
};
