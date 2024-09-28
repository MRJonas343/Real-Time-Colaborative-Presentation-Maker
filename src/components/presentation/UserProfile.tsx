"use client";

import { Checkbox, Divider } from "@nextui-org/react";
import { UserProfileProps } from "@/interfaces";
import { FC } from "react";

export const UserProfile: FC<UserProfileProps> = ({
	userName,
	role,
	changeRole,
	id,
	state,
}) => {
	let isEditor = false;

	if (role === "editor") {
		isEditor = true;
	}

	const onChangeRole = (value: string) => {
		if (role === "viewer") {
			changeRole(value, "editor");
			return;
		}
		changeRole(value, "viewer");
	};

	return (
		<div className="">
			{state.participanName === userName ? (
				<p className="text-blue-600">You</p>
			) : (
				<p>{userName}</p>
			)}
			<div className="flex gap-4">
				<p>{role} mode</p>
				{state.role === "creator" && (
					<Checkbox
						onClick={() => onChangeRole(userName)}
						isSelected={isEditor}
					/>
				)}
			</div>
			<Divider className="my-4 bg-gray-700 h-[2px] w-full mx-auto" />
		</div>
	);
};
