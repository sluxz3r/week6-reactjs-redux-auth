import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';

import '../assets/borrow.css'
import { postBorrow } from '../Publics/redux/actions/borrow';

class BorrowForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: this.props.ktp,
			id: this.props.id,
			modal: false,
			borrow: [],
		};

		this.toggle = this.toggle.bind(this);
	};

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {
		const borrow = () => {
			this.state.borrow.push({
				bookid: this.state.id,
				user_id: this.state.user_id,
			});
			add()
			this.setState((prevState) => ({
				modal: !prevState.modal
			}));
		};
		let add = async () => {
			await this.props.dispatch(postBorrow(this.state.borrow[0]));
		};

		var today = new Date();
		var dd = String(today.getDate()+ 3).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();

		const date = dd + ' - ' + mm + ' - ' + yyyy;
		return (
			<div>
				<button style={{
					color: 'white',
					backgroundColor: 'black',
					marginBottom: '10px',
					width: '100px'
				}}
					onClick={this.toggle}>
					Borrow
				</button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="{this.props.className} modal-md">
					<ModalHeader toggle={this.toggle}>
						<b>User Data</b>
					</ModalHeader>
					<ModalBody>
						<table style={{ marginLeft: '30px' }}>
							<tr>
								<th style={{ paddingRight: '100px' }}> Name</th>
								<th>: {this.props.fullname}</th>
							</tr>
							<tr>
								<th>ID Card</th>
								<th>: {this.props.ktp}</th>
							</tr>
							<tr>
								<th>Book Title</th>
								<th>: {this.props.name}</th>
							</tr>
							<tr>
								<th>Date Return</th>
								<th>: {date}</th>
							</tr>
						</table>
					</ModalBody>
					<ModalFooter>
						<a href={`/book/${this.state.id}`}><button class="buttonSave" onClick={borrow.bind(this)}>
							GET
						</button>
						</a>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		borrow: state.borrow
	};
};
export default connect(mapStateToProps)(BorrowForm);