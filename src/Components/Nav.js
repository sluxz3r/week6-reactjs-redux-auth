import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import '../assets/nav.css';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render() {
    return (
      <div className='nav'>
        <a href='/'><button className='butt'>BOOKS</button></a>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}  style={{
          paddingLeft:'800px'
        }}>

        {localStorage.name != null ?
        (<DropdownToggle>
           Hi {localStorage.name}
        </DropdownToggle>) :
        (<DropdownToggle href='/login'>
            Login
        </DropdownToggle>)}
          {localStorage.jwtToken != null ?
        (<DropdownMenu>
          {localStorage.status == 0 ? 
          (<DropdownItem href='/admin/'>Member List</DropdownItem>) : 
          (<DropdownItem href='/member/' >Profile</DropdownItem>)}
          <DropdownItem href='/logout/'>Logout</DropdownItem>
        </DropdownMenu>):
        ('')}
      </Dropdown>
      </div>
    );
  }
}

export default Nav;
