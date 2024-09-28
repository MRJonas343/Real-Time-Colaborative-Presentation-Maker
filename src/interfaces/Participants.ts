export interface Participants {
	participants: ParticipantsClass;
	presentations: Presentations;
}

export interface ParticipantsClass {
	id: number;
	presentationId: number;
	name: string;
	role: string;
}

export interface Presentations {
	id: number;
	creator: string;
	numberOfSlides: number;
	createdAt: string;
	topic: string;
}

export interface Participant {
	id: number;
	userName: string;
	role: string;
}
