import { Action } from "@/interfaces";
import { initialState } from "../state";

export const changeCurrentSlide = (
	state: typeof initialState,
	dispatch: (value: Action) => void,
	id: string,
) => {
	dispatch({ type: "SET_CURRENT_SLIDE", payload: Number(id) });
};
