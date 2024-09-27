import { JoinPresentationResponse } from "@/interfaces/joinPresentationResponse";

export const joinPresentation = async (
	presentationId: string,
	userName: string,
) => {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
	const response = await fetch(
		`${BASE_URL}/loby/joinPresentation/${presentationId}/${userName}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	const data: JoinPresentationResponse = await response.json();

	return data;
};
