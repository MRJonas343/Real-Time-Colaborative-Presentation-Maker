import { CanvasElement } from "./CanvasElement";

export interface UpdateCanvasElementsResponse {
	newElements: CanvasElement[];
	currentSlide: number;
}
