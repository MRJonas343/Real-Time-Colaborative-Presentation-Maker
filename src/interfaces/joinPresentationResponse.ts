import { Role } from "./Role";

export interface JoinPresentationResponse {
	userName: string;
	creator: string;
	topic: string;
	totalOfSlides: number;
	role: Role;
	slidesData: SlidesDatum[];
}

export interface SlidesDatum {
	id: number;
	presentationId: number;
	position: number;
	canvasElements: unknown[] | null;
	previewImage: string;
}
