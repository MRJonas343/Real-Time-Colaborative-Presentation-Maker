import { socket } from "@/constants";

export const changeCurrentSlideSocket = (
	presentationId: string,
	slidePosition: number,
) => {
	socket.emit("changeCurrentSlide", {
		presentationId: presentationId,
		slidePosition: slidePosition,
	});
};
