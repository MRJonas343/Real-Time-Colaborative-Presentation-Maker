"use client";

import { useEffect, useState } from "react";
import { Gallery, ToolbarHome, ModalLoby, Footer } from ".";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { createPresentation } from "@/Services/createPresentation";
import { getLobySlides, ResponseGetSlidesLoby } from "@/Services/getLobySlides";

export const Loby = () => {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const router = useRouter();

	const [presentationId, setPresentationId] = useState("");
	const [totalPages, setTotalPages] = useState(3);
	const [isGalleryLoading, setIsGalleryLoading] = useState(true);
	const [slides, setSlides] = useState<ResponseGetSlidesLoby[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	const onNewPresentation = () => {
		onOpen();
	};

	const onSearch = async (value: string) => {
		if (!value) {
			//*refecth the slides for the page 1 and set the page to 1
			getLobySlides("1", setSlides, setIsGalleryLoading);
			setCurrentPage(1);
			return;
		}
		const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
		const presentation = await fetch(`${BASE_URL}/loby/getSlideById`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				presentationId: value,
			},
		});

		const data = await presentation.json();

		if (!data) return;

		//*update the slides
		setSlides([data]);
	};

	const displayModal = (id: string) => {
		setPresentationId(id);
		onOpen();
	};

	const onJoinPresentation = async (
		name: string,
		id?: string,
		title?: string,
	) => {
		//TODO : If we dont have the id, we should create a new presentation
		//TODO : If we have the id, we should join the presentation

		if (!id) {
			console.log("Creating new presentation:", name, title);

			try {
				const result = await createPresentation(
					name,
					title ?? "Untitled Presentation",
				);

				//*Get the previus elements in the local Storage
				const elements = localStorage.getItem("presentationes");

				if (!elements) {
					const newPresentation = [
						{
							presentationId: result.presentationId,
							userName: name,
						},
					];

					localStorage.setItem(
						"presentationes",
						JSON.stringify(newPresentation),
					);
					return router.push(`/presentation/${result.presentationId}`);
				}

				const parsedElements = JSON.parse(elements);
				parsedElements.push({
					presentationId: result.presentationId,
					userName: name,
				});
				localStorage.setItem("presentationes", JSON.stringify(parsedElements));

				router.push(`/presentation/${result.presentationId}`);
			} catch (error) {
				console.log("Error creating presentation:", error);
			}

			return onClose();
		}

		console.log("Joining presentation:", name, id);

		onClose();
	};

	const onSortBy = (value: string) => {
		console.log("Sorting by:", value);
	};

	const onPageChange = (page: number) => {
		//*Ask the server for the slides of the page
		setCurrentPage(page);
		getLobySlides(page.toString(), setSlides, setIsGalleryLoading);
	};

	useEffect(() => {
		setIsGalleryLoading(true);
		getLobySlides("1", setSlides, setIsGalleryLoading);
	}, []);

	return (
		<>
			<ToolbarHome
				onSortBy={onSortBy}
				onNewPresentation={onNewPresentation}
				onSearch={onSearch}
			/>
			<section className="w-[90%] mx-auto mt-8">
				<Gallery
					isLoading={isGalleryLoading}
					displayModal={displayModal}
					slides={slides}
				/>
			</section>
			<ModalLoby
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				presentationId={presentationId}
				onSubmitForm={(userName, title, id) =>
					onJoinPresentation(userName, id, title)
				}
			/>
			<Footer
				page={currentPage}
				total={totalPages}
				setPage={(page) => onPageChange(page)}
			/>
		</>
	);
};
