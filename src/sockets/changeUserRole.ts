import { socket } from "@/constants";

export const changeUserRole = (
	presentationId: string,
	userName: string,
	role: string,
) => {
	socket.emit("changeUserRole", {
		presentationId: presentationId,
		userName: userName,
		role: role === "editor" ? "viewer" : "editor",
	});
};
