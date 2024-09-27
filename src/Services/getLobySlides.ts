import { Dispatch, SetStateAction } from "react";

export interface ResponseGetSlidesLoby {
	presentationId: number;
	topic: string;
	creator: string;
	previewImage: string;
	numberOfParticipants: number;
}

export const getLobySlides = async (
	page: string,
	setSlides: Dispatch<SetStateAction<ResponseGetSlidesLoby[]>>,
	setIsGalleryLoading: Dispatch<SetStateAction<boolean>>,
) => {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
	const response = await fetch(`${BASE_URL}/loby/slidesGallery`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			page: page,
		},
	});

	const data: ResponseGetSlidesLoby[] = await response.json();

	setSlides(data);
	setIsGalleryLoading(false);
};
