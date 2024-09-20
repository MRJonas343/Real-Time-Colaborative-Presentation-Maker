export interface ModalLobyProps {
	presentationId?: string;
	onSubmitForm: (id?: string) => void;
	isOpen: boolean;
	onOpenChange: () => void;
}
