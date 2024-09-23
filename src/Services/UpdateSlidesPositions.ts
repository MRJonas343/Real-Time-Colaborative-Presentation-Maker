import { initialState } from "@/components/presentation";
import { Action, SlideExample } from "@/interfaces";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

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

	// TODO: actualizar las previsualizaciones de otros colaboradores y la BD con el nuevo orden
};
