import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../assets/nav.css';

import { getUserId, logout } from '../Publics/redux/actions/user';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      user: [],
      dropdownOpen: false
    }
  }
  componentDidMount = async () => {
    const userid = localStorage.userid;
    await this.props.dispatch(getUserId(userid));
    this.setState({
      user: this.props.user,
    });
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render() {
    const { user } = this.state;
    const list = user.userList;
    const name = list ? list[0].fullname : '';
    const status = list ? list[0].status : '';
    const userid = list ? list[0].userid : '';

    const del = async () => {
      await this.props.dispatch(logout(userid));
      localStorage.removeItem('userid')
      localStorage.removeItem('jwtToken')
      swal({
        title: "Logout",
        text: "Logout Success !!",
        icon: "success",
        button: "OK"
      }).then(() => {
          window.location.href = '/login/';
        })
  };
    return (
      <div className='nav'>
        <a href='/'><button className='butt'>BOOKS</button></a>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{
          paddingLeft: '900px'
        }}>

          {// eslint-disable-next-line
            list != undefined ?
            (<DropdownToggle style={{fontFamily:'Arial, Helvetica, sans-serif'}}>
              Hi {name}
            </DropdownToggle>) :
            
            (<Link to='/login'><DropdownToggle style={{fontFamily:'Arial, Helvetica, sans-serif'}}>
              Login
        </DropdownToggle></Link>)}

          {// eslint-disable-next-line
            list != undefined ?
            (<DropdownMenu>
              {// eslint-disable-next-line
                status == 'admin' ?
                (<div><DropdownItem style={{fontFamily:'Arial, Helvetica, sans-serif'}} href='/admin/'>Member List</DropdownItem>
                <DropdownItem style={{fontFamily:'Arial, Helvetica, sans-serif'}} href='/admin/pending/'>Pending List</DropdownItem></div>) :
                (<DropdownItem style={{fontFamily:'Arial, Helvetica, sans-serif'}} href='/member/' >Profile</DropdownItem>)}
               <Link style={{textDecoration:'none'}} onClick={del.bind(this)}><DropdownItem style={{fontFamily:'Arial, Helvetica, sans-serif', fontWeight:'bold'}}>Logout</DropdownItem></Link>
            </DropdownMenu>) :
            ('')}
        </Dropdown>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Nav);
