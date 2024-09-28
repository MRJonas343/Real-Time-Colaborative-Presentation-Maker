import { socket } from "@/constants";
import { Action } from "@/interfaces";

export const deleteSlide = (
	presentationId: string,
	slideId: string,
	dispatch: (value: Action) => void,
) => {
	socket.emit("deleteSlide", { presentationId, slideId });
	dispatch({ type: "SET_CLICKED_SLIDE_ID", payload: "" });
	dispatch({ type: "SET_IS_SLIDE_MENU_OPEN", payload: false });
};
