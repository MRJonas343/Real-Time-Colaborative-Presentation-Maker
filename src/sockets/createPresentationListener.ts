import { socket } from "@/constants";
import { Action } from "@/interfaces";

export const createPresentationListener = (
	dispatch: (value: Action) => void,
) => {
	socket.on("presentationCreated", (data) => {
		console.log("Presentation created:", data);
	});
};
