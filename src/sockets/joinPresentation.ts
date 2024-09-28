import { socket } from "@/constants";

export const joinPresentation = (presentationId: string, userName: string) => {
	socket.emit("joinPresentation", { presentationId, userName });
};
