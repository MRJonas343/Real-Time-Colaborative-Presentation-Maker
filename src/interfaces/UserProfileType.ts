import { Role } from ".";

export interface UserProfileProps {
	id: number;
	userName: string;
	role: string;
	changeRole: (userName: string, role: Role) => void;
}
