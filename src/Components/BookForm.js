import React, { Component } from 'react';
import { connect } from 'react-redux'
import swal from 'sweetalert';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Col,
	Input
} from 'reactstrap';

import '../assets/BookForm.css'

import { postBook } from '../Publics/redux/actions/book';


class BookForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			book: [],
			file:null
		};

		this.toggle = this.toggle.bind(this);
		this.onChangeFile = this.onChangeFile.bind(this)
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}
	onChangeFile = (e) => {
        console.log(e.target.files[0])
        this.setState({
            file: e.target.files[0],
        })
    }

	render() {
		const bookAdd = () => {
			let fk_cat = '';
			switch (this.state.fk_cat) {
				case 'Anak':
					fk_cat = 2;
					break;
				default:
					fk_cat = 1;
			}
			let fk_loc = '';
			switch (this.state.fk_loc) {
				case 'Rak 2':
					fk_loc = 2;
					break;
				default:
					fk_loc = 1;
			}
			const dataFile = new FormData()
			dataFile.append('image', this.state.file)
			dataFile.append('name', this.state.name)
			dataFile.append('writer', this.state.writer)
			dataFile.append('fk_cat', fk_cat)
			dataFile.append('fk_loc', fk_loc)
			dataFile.append('des', this.state.des)
			

			add(dataFile)
			this.setState((prevState) => ({
				modal: !prevState.modal
			}));
			console.log(this.state.book);
		};
		let add = async (data) => {
			await this.props.dispatch(postBook(data))
			.then(() => {
				swal({
				  title: "Add Book",
				  text: `Add Book Success`,
				  icon: "success",
				  button: "OK"
				}).then(() => {
				  window.location.href = '/books/';
				})
			  })
		};
		return (
			<div>
				<div class="button-bar">
					<button class="button" onClick={this.toggle}>
						+
				</button>
				</div>
				<Modal isOpen={this.state.modal} toggle={this.toggle} size="lg" style={{ marginTop: '60px', }}>
					<ModalHeader toggle={this.toggle}>
						<b>Add Data</b>
					</ModalHeader>
					<ModalBody style={{ paddingLeft: '60px' }}>
						<Form>
							<FormGroup row>
								<Label sm={2} size="lg">
									Name
								</Label>
								<Col sm={8}>
									<Input
										type="text"
										name="name"
										onChange={(e) => this.setState({ name: e.target.value })}
										id="name"
										placeholder="Name..."
										bsSize="lg"
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2} size="lg">
									Writer
								</Label>
								<Col sm={8}>
									<Input
										type="text"
										name="writer"
										onChange={(e) => this.setState({ writer: e.target.value })}
										id="writer"
										placeholder="Writer..."
										bsSize="lg"
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2} size="lg">
									Image
								</Label>
								<Col sm={8}>
									<Input
										type="file"
										name="title"
										onChange={this.onChangeFile}
										id="title"
										placeholder="Image..."
										bsSize="lg"
										style={{ height: 40, fontSize: 12 }}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2} size="lg">
									Category
								</Label>
								<Col sm={8}>
									<select style={{
										color: 'white',
										backgroundColor: 'black',
										marginTop:'15px',
										width:'100px',}} 
										onChange={(e) => this.setState({ fk_cat: e.target.value })}>
										<option >Fiksi</option>
										<option>Anak</option>
									</select>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2} size="lg">
									Location
								</Label>
								<Col sm={8}>
									<select style={{
										color: 'white',
										backgroundColor: 'black',
										marginTop:'15px',
										width:'100px',}}
										onChange={(e) => this.setState({ fk_loc: e.target.value })}>
										<option >Rak 1</option>
										<option>Rak 2</option>
									</select>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2} size="lg">
									Description
								</Label>
								<Col sm={6}>
									<textarea
										type="text"
										name="Description"
										onChange={(e) => this.setState({ des: e.target.value })}
										id="description"
										placeholder="Description..."
										style={{ width: '471px', height: '60px' }}
									/>
								</Col>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<button type='submit' class="buttonSave" onClick={bookAdd.bind(this)}>
							SAVE
						</button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		book: state.book
	};
};
export default connect(mapStateToProps)(BookForm);