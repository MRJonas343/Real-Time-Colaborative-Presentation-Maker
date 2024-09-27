import { ResponseGetSlidesLoby } from "@/Services/getLobySlides";

export interface GalleryProps {
	displayModal: (id: string) => void;
	isLoading: boolean;
	slides: ResponseGetSlidesLoby[];
}
