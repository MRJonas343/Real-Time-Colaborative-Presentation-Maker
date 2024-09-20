"use client";

import { useEffect, useState } from "react";
import { Gallery, ToolbarHome, ModalLoby, Footer } from ".";
import { useDisclosure } from "@nextui-org/react";

export const Loby = () => {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

	const [presentationId, setPresentationId] = useState("");
	const [totalPages, setTotalPages] = useState(10);
	const [isGalleryLoading, setIsGalleryLoading] = useState(true);

	const onNewPresentation = () => {
		setPresentationId("");
		onOpen();
		console.log("New Presentation");
	};

	const onSearch = (value: string) => {
		console.log("Searching for:", value);
	};

	const displayModal = (id: string) => {
		setPresentationId(id);
		onOpen();
	};

	const onJoinPresentation = (id?: string) => {
		//TODO : If we dont have the id, we should create a new presentation
		//TODO : If we have the id, we should join the presentation
		console.log("Joining presentation:", id);
		onClose();
	};

	const onSortBy = (value: string) => {
		console.log("Sorting by:", value);
	};

	const onPageChange = (page: number) => {
		console.log("Page changed to:", page);
	};

	useEffect(() => {
		setIsGalleryLoading(true);
		setTimeout(() => {
			setIsGalleryLoading(false);
			setTotalPages(10);
		}, 1000);
	}, []);

	return (
		<>
			<ToolbarHome
				onSortBy={onSortBy}
				onNewPresentation={onNewPresentation}
				onSearch={onSearch}
			/>
			<section className="w-[90%] mx-auto mt-8">
				<Gallery isLoading={isGalleryLoading} displayModal={displayModal} />
			</section>
			<ModalLoby
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				presentationId={presentationId}
				onSubmitForm={onJoinPresentation}
			/>
			<Footer total={totalPages} onPageChange={onPageChange} />
		</>
	);
};
