import { SlideExample } from "@/interfaces";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export const updateSlidesPositions = (
	e: DragEndEvent,
	updateSlides: (slides: SlideExample[]) => void,
	slides: SlideExample[],
) => {
	const { active, over } = e;

	if (!active || !over) {
		return;
	}

	if (active.id !== over.id) {
		console.log("dragging slide", active, "over", over);
		const oldIndex = slides.findIndex((slide) => slide.id === active.id);
		const newIndex = slides.findIndex((slide) => slide.id === over.id);
		const updatedSlides = arrayMove(slides, oldIndex, newIndex);
		updateSlides(updatedSlides);
	}

	// TODO: actualizar las previsualizaciones de otros colaboradores y la BD con el nuevo orden
};
