"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { Button, ModalFooter, Input } from "@nextui-org/react";
import { FC, FormEvent, useState } from "react";
import { ModalLobyProps } from "@/interfaces";

export const ModalLoby: FC<ModalLobyProps> = ({
	presentationId,
	onSubmitForm,
	onOpenChange,
	isOpen,
}) => {
	const [isNameInvalid, setIsNameInvalid] = useState(false);
	const [isTitleInvalid, setIsTitleInvalid] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.target as HTMLFormElement);
		const userName = form.get("name")?.toString();
		const title = form.get("title")?.toString();

		console.log("userName:", userName);

		if (!userName) {
			return setIsNameInvalid(true);
		}
		if (!presentationId && !title) {
			return setIsTitleInvalid(true);
		}

		setIsNameInvalid(false);
		setIsTitleInvalid(false);
		onSubmitForm(userName, title, presentationId);
	};

	return (
		<Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onCloseModal) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{presentationId
								? `Joining presentation: ${presentationId}`
								: "New Presentation"}
						</ModalHeader>
						<form onSubmit={handleSubmit}>
							<ModalBody>
								<p className="pb-4">
									{presentationId
										? "You will join as a viewer, you will not be able to edit anything, just to see the slides, unless the creator gives you the permission to edit."
										: "You will create a new presentation, as the creator you can edit everything, add slides, delete slides, make peaple editors or viewers, etc."}
								</p>
								<Input
									isInvalid={isNameInvalid}
									name="name"
									errorMessage="You must enter your name"
									label="Your name"
									radius="sm"
								/>
								{!presentationId && (
									<Input
										isInvalid={isTitleInvalid}
										name="title"
										errorMessage="You must enter a title"
										label="Presentation title"
										radius="sm"
									/>
								)}
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onCloseModal}>
									Close
								</Button>
								<Button type="submit" color="primary">
									{presentationId ? "Join" : "Create"}
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
