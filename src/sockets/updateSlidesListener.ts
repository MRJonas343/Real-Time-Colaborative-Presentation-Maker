import { socket } from "@/constants";
import { Action } from "@/interfaces";

export interface NewSlides {
	id: number;
	presentationId: number;
	position: number;
	canvasElements: unknown[];
	previewImage: string;
}

export const updateSlidesListener = (dispatch: (value: Action) => void) => {
	socket.on("newSlides", (slides: NewSlides[]) => {
		console.log("Slides updated:", slides);
		const newSlides = slides.map((slide) => {
			return {
				id: String(slide.id),
				slidePreview: slide.previewImage,
			};
		});

		dispatch({ type: "SET_SLIDES_PREVIEWS", payload: newSlides });
	});
};
