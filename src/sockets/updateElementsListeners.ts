import { initialState, drawElement } from "@/components/presentation";
import { socket } from "@/constants";
import { Action } from "@/interfaces";
import { UpdateCanvasElementsResponse } from "@/interfaces/updateCanvasElementResponse";
import { MutableRefObject } from "react";

export const updateElementsListeners = (
	dispatch: (value: Action) => void,
	stateRef: MutableRefObject<typeof initialState>,
	ctx: CanvasRenderingContext2D | undefined | null,
) => {
	socket.on("newElements", (data: UpdateCanvasElementsResponse) => {
		if (data.currentSlide !== stateRef.current.currentSlide) return;

		const currentElements = stateRef.current.drawnElements;

		const updatedElements = currentElements
			.map((oldElement) => {
				const newElement = data.newElements.find(
					(el) => el.id === oldElement.id,
				);
				return newElement ? { ...oldElement, ...newElement } : oldElement;
			})

			.filter((element) => data.newElements.some((el) => el.id === element.id));

		const newElementsToAdd = data.newElements.filter(
			(element) => !currentElements.some((el) => el.id === element.id),
		);

		const finalElements = [...updatedElements, ...newElementsToAdd];

		dispatch({ type: "SET_DRAWN_ELEMENTS", payload: finalElements });

		if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		for (const element of finalElements) drawElement(ctx, element);
	});

	socket.on("updateZindexServer", (data: UpdateCanvasElementsResponse) => {
		if (data.currentSlide !== stateRef.current.currentSlide) return;

		const newElements = data.newElements;

		dispatch({ type: "SET_DRAWN_ELEMENTS", payload: newElements });
		if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		for (const element of newElements) drawElement(ctx, element);
	});
};
