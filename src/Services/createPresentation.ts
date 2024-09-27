export interface Data {
	presentationId: string;
	creator: string;
	role: string;
	topic: string;
	numberOfSlides: number;
	slideId: string;
	totalOfSlides: number;
	slidesPreviews: SlidesPreview[];
}

export interface SlidesPreview {
	id: string;
	slidePreview: string;
}

export const createPresentation = async (
	presentatioTopic: string,
	creator: string,
) => {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
	const response = await fetch(`${BASE_URL}/loby/createPresentation`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			creator: creator,
			topic: presentatioTopic,
		}),
	});

	const data: Data = await response.json();

	return data;
};
