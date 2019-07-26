import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';

import { register } from '../Publics/redux/actions/user';

class Register extends Component {
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
        const userAdd = () => {
            this.state.user.push({
                email: this.state.email,
                fullname: this.state.fullname,
                password: this.state.password,
                user_ktp: this.state.user_ktp,
            });

            add()
            this.setState((prevState) => ({
                modal: !prevState.modal
            }));
            console.log(this.state.user);
        };
        let add = async () => {
            await this.props.dispatch(register(this.state.user[0]))
                .then(() => {
                    swal({
                        title: "Register",
                        text: "Register Success !!",
                        icon: "success",
                        button: "OK"
                    }).then(() => {
                        window.location.href = '/login';
                    })
                })
                .catch(() => {
                    swal({
                        title: "Register Failed",
                        text: "Email is not Avalaible",
                        icon: "warning",
                        buttons: "OK"
                    })
                })
        };
        return (
            <Container style={{ paddingTop:'100px'}}>
          <h2>Sign Up</h2>
          <Form className="fo">
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  id="exampleEmail"
                  placeholder="myemail@email.com"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Fullname</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={(e) => this.setState({ fullname: e.target.value })}
                  id="exampleEmail"
                  placeholder="your name..."
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>ID Card</Label>
                <Input
                  type="text"
                  name="card"
                  onChange={(e) => this.setState({ user_ktp: e.target.value })}
                  id="card"
                  placeholder="Your ID Card..."
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  id="examplePassword"
                  placeholder="password..."
                />
              </FormGroup>
            </Col>
            <Button onClick={userAdd.bind(this)}>Sign Up</Button>
            <br />
            <span>Already registered <Link to="login">go to login</Link></span>
          </Form>
        </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    };
};
export default connect(mapStateToProps)(Register);