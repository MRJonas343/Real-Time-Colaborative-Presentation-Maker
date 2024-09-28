import { initialState } from "@/components/presentation";
import { Role } from ".";

export interface UserProfileProps {
	id: number;
	userName: string;
	role: string;
	changeRole: (userName: string, role: Role) => void;
	state: typeof initialState;
}
