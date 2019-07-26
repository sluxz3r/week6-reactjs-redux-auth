import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../assets/nav.css';

import { getUserId } from '../Publics/redux/actions/user';

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
    return (
      <div className='nav'>
        <a href='/'><button className='butt'>BOOKS</button></a>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{
          paddingLeft: '900px'
        }}>

          {list != undefined ?
            (<DropdownToggle>
              Hi {name}
            </DropdownToggle>) :
            (<DropdownToggle href='/login'>
              Login
        </DropdownToggle>)}

          {list != undefined ?
            (<DropdownMenu>
              {status == 'admin' ?
                (<DropdownItem href='/admin/'>Member List</DropdownItem>) :
                (<DropdownItem href='/member/' >Profile</DropdownItem>)}
              <DropdownItem href='/logout/'>Logout</DropdownItem>
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
