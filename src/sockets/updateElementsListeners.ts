import { initialState } from "@/components/presentation";
import { socket } from "@/constants";
import { Action } from "@/interfaces";
import { UpdateCanvasElementsResponse } from "@/interfaces/updateCanvasElementResponse";
import { drawElement } from "@/components/presentation";
import { MutableRefObject } from "react";

export const updateElementsListeners = (
	dispatch: (value: Action) => void,
	stateRef: MutableRefObject<typeof initialState>,
	ctx: CanvasRenderingContext2D | undefined | null,
) => {
	socket.on("newElements", (data: UpdateCanvasElementsResponse) => {
		if (data.currentSlide !== stateRef.current.currentSlide) return;
		for (const element of data.newElements) drawElement(ctx, element);
		dispatch({ type: "SET_DRAWN_ELEMENTS", payload: data.newElements });
	});
};
