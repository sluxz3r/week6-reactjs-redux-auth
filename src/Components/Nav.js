import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
        (<DropdownToggle >
          No Account
        </DropdownToggle>)}
          {localStorage.jwtToken != null ?
        (<DropdownMenu>
          <DropdownItem href='/logout'>Logout</DropdownItem>
        </DropdownMenu>):
        (<DropdownMenu>
          <DropdownItem href='/login'>Login</DropdownItem>
          <DropdownItem href='/register'>Sign Up</DropdownItem>
        </DropdownMenu>)}
      </Dropdown>
      </div>
    );
  }
}

export default Nav;
