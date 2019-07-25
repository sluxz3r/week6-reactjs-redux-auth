import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { login, getUserId } from '../Publics/redux/actions/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };

    this.toggle = this.toggle.bind(this);
  }
  componentDidMount = async () => {
    const userid = localStorage.userid;
    await this.props.dispatch(getUserId(userid));
    this.setState({
      user: this.props.user,
    });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const userAdd = () => {
      this.state.user.push({
        email:this.state.email,
        password: this.state.password
      });
      add()
      this.setState((prevState) => ({
        modal: !prevState.modal
      }));
    };
    let add = async () => {
      await this.props.dispatch(login(this.state.user[0]));
    };
    const { user } = this.state;
    const list = user.userList;
    const name = list ? list[0].fullname : '';
    return (
      <Container style={{paddingTop:'100px'}}>
          {list != undefined ? (<h3>Login Sukses. Selamat Datang {name}</h3>) : 
        (<div>
            <h2>Sign In</h2>
        <Form className="form">
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
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                id="examplePassword"
                placeholder="*******"
              />
            </FormGroup>
          </Col>
          <Button onClick={userAdd.bind(this)} href="/login">Sign In</Button>
          <br/>
          <span>Not register yet, <Link to="/register">register now</Link></span>
        </Form>
        </div>)}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
      user: state.user
  };
};
export default connect(mapStateToProps) (Login);