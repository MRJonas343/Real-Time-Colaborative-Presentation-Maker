"use client";

import { Checkbox, Divider } from "@nextui-org/react";
import { UserProfileProps } from "@/interfaces";
import { FC } from "react";

export const UserProfile: FC<UserProfileProps> = ({
	userName,
	role,
	changeRole,
	id,
}) => {
	let isEditor = false;

	if (role === "Editor") {
		isEditor = true;
	}

	const onChangeRole = (value: string) => {
		if (role === "Viewer") {
			changeRole(value, "Editor");
			return;
		}
		changeRole(value, "Viewer");
	};

	return (
		<div className="">
			<p>{userName}</p>
			<div className="flex gap-4">
				<p>Editor mode</p>
				<Checkbox
					onClick={() => onChangeRole(userName)}
					isSelected={isEditor}
				/>
			</div>
			<Divider className="my-4 bg-white h-1 w-full mx-auto" />
		</div>
	);
};
