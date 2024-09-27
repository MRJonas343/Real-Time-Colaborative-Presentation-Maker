import { Action } from "@/interfaces";

import { LocalStoragePresentation } from "@/interfaces/LocalStoragePresentation";
import { joinPresentation } from "@/Services/joinPresentation";

export const setInitialData = async (
	dispatch: (value: Action) => void,
	userName: string,
	id: string,
) => {
	const data = await joinPresentation(id, userName ?? "Anonymous");

	dispatch({ type: "SET_TOPIC", payload: data.topic });
	dispatch({ type: "SET_CREATOR", payload: data.creator });
	dispatch({ type: "SET_ID", payload: id });
	dispatch({ type: "SET_TOTAL_SLIDES", payload: data.totalOfSlides });
	dispatch({ type: "SET_ROLE", payload: data.role });
	dispatch({ type: "SET_IS_LOADING", payload: false });

	const newSlides = data.slidesData.map((slide) => {
		return {
			id: slide.id.toString(),
			slidePreview: slide.previewImage,
		};
	});

	dispatch({ type: "SET_SLIDES_PREVIEWS", payload: newSlides });
};
