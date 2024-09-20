import { SlideExample } from "@/interfaces";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Dispatch, SetStateAction } from "react";

export const updateSlidesPositions = (
	e: DragEndEvent,
	setSlidePreviews: Dispatch<SetStateAction<SlideExample[]>>,
) => {
	const { active, over } = e;

	if (!active || !over) {
		return;
	}

	if (active.id !== over.id) {
		console.log("dragging slide", active, "over", over);
		setSlidePreviews((slides) => {
			const oldIndex = slides.findIndex((slide) => slide.id === active.id);
			const newIndex = slides.findIndex((slide) => slide.id === over.id);
			return arrayMove(slides, oldIndex, newIndex);
		});
	}
	//TODO: update slide previews of the other colaborators and the DB with the new order
};
