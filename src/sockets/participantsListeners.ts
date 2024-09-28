import { socket } from "@/constants";
import { Action } from "@/interfaces";
import { Participants } from "@/interfaces/Participants";

export const participantsListeners = (
	dispatch: (value: Action) => void,
	currentUser: string,
) => {
	socket.on("participants", (participants: Participants[]) => {
		const newParticipants = participants.map((participant) => {
			return {
				id: participant.participants.id,
				role: participant.participants.role,
				userName: participant.participants.name,
			};
		});

		const currentParticipant = newParticipants.find(
			(participant) => participant.userName === currentUser,
		);

		if (currentParticipant) {
			dispatch({ type: "SET_ROLE", payload: currentParticipant.role });
		}

		dispatch({ type: "SET_PARTICIPANTS", payload: newParticipants });
	});
};
