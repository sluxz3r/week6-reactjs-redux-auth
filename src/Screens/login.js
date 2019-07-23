import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Form,
    FormGroup,
    Label,
    Col,
    Input
} from 'reactstrap';

import { login } from '../Publics/redux/actions/user';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleDrop() {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const bookAdd = () => {
            this.state.user.push({
                email: this.state.email,
                password: this.state.password,
            });

            add()
            this.setState((prevState) => ({
                modal: !prevState.modal
            }));
           
        };
        let add = async () => {
            await this.props.dispatch(login(this.state.user[0]));
        };
        return (
            <div>
                <Form style={{paddingTop:'100px'}}>
                    <FormGroup row>
                        <Label sm={2} size="lg">
                            Email
								</Label>
                        <Col sm={8}>
                            <Input
                                type="email"
                                name="email"
                                onChange={(e) => this.setState({ email: e.target.value })}
                                id="email"
                                placeholder="Email..."
                                bsSize="lg"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} size="lg">
                            Password
								</Label>
                        <Col sm={8}>
                            <Input
                                type="password"
                                name="password"
                                onChange={(e) => this.setState({ password: e.target.value })}
                                id="password"
                                placeholder="Password..."
                                bsSize="lg"
                            />
                        </Col>
                    </FormGroup>
                    <Link to='/'> <button type='submit' class="buttonSave" onClick={bookAdd.bind(this)}>
							Login
						</button>
                        </Link>
                </Form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        book: state.book
    };
};
export default connect(mapStateToProps)(Login);