import { MouseEvent } from "react";
export interface SlidePreviewType {
	slideId: string;
	slidePreview?: string;
	isLoading: boolean;
	openSlideMenu: (e: MouseEvent<HTMLDivElement>, id: string) => void;
	changeCurrentSlides(id: string): void;
}
