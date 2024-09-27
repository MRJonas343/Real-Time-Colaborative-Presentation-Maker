import { MouseEvent, RefObject } from "react";
import { Action } from "@/interfaces";
export const openSlideMenu = (
	e: MouseEvent<HTMLDivElement>,
	id: string,
	dispatch: (value: Action) => void,
) => {
	e.preventDefault();
	const x = e.clientX;
	const y = e.clientY;

	dispatch({ type: "SET_SLIDE_MENU_X", payload: x });
	dispatch({ type: "SET_SLIDE_MENU_Y", payload: y });
	dispatch({ type: "SET_IS_SLIDE_MENU_OPEN", payload: true });
	dispatch({ type: "SET_CLICKED_SLIDE_ID", payload: id });
};
