import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React from 'react';

type Props = {
	show: boolean,
	onHide: () => void,
	title: string | any,
	children: React.ReactNode,
	onConfirm?: () => {}
}

export default function VerticalCenteredModal(props: Props) {
	return (
		<Modal
			{...props}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{props.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{props.children}
			</Modal.Body>
			<Modal.Footer>
				{ props.onConfirm ? (
					<Button variant="success" onClick={props.onConfirm}>Ya</Button>
				) : '' }
				<Button onClick={props.onHide}>Tutup</Button>
			</Modal.Footer>
		</Modal>
	);
}