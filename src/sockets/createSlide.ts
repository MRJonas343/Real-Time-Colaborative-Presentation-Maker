import { socket } from "@/constants";

export const createSlide = (presentationId: string) => {
	socket.emit("createSlide", { presentationId });
};
