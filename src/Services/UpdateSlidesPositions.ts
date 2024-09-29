"use client";

import { initialState } from "@/components/presentation";
import { Action } from "@/interfaces";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { updateSlidesOders } from "@/sockets";

export const updateSlidesPositions = (
	e: DragEndEvent,
	dispatch: (value: Action) => void,
	state: typeof initialState,
) => {
	const { active, over } = e;

	if (!active || !over) {
		return;
	}

	if (active.id !== over.id) {
		updateSlidesOders(String(active.id), String(over.id), state.presentationId);
		const oldIndex = state.slidesPreviews.findIndex(
			(slide) => slide.id === active.id,
		);
		const newIndex = state.slidesPreviews.findIndex(
			(slide) => slide.id === over.id,
		);

		const updatedSlides = arrayMove(state.slidesPreviews, oldIndex, newIndex);

		dispatch({
			type: "SET_SLIDES_PREVIEWS",
			payload: updatedSlides,
		});
	}
};
