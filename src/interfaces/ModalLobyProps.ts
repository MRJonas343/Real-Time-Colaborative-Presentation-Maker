export interface ModalLobyProps {
	presentationId?: string;
	onSubmitForm: (name: string, title?: string, id?: string) => void;
	isOpen: boolean;
	onOpenChange: () => void;
}
