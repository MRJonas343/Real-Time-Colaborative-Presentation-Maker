import { Role } from "@/interfaces";

export const changeUserRole = (userName: string, role: Role) => {
	console.log("Changing role of user:", userName, "to:", role);
};
