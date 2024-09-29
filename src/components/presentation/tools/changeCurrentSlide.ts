import { Action } from "@/interfaces";
import { initialState } from "../state";
import { changeCurrentSlideSocket } from "@/sockets/changeCurrentSlide";

export const changeCurrentSlide = (
	state: typeof initialState,
	dispatch: (value: Action) => void,
	id: string,
) => {
	const slidePosition = state.slidesPreviews.find((slide) => slide.id === id);

	dispatch({
		type: "SET_CURRENT_SLIDE",
		payload: Number(slidePosition?.position),
	});

	changeCurrentSlideSocket(
		state.presentationId,
		Number(slidePosition?.position),
	);
};
