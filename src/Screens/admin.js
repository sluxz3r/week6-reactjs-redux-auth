import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/BookList.css';

import { getUser, deleteMember} from '../Publics/redux/actions/user'

class Member extends Component {
    state = {
        index: '',
        user: [],
    };
    componentDidMount = async () => {
        await this.props.dispatch(getUser());
        this.setState({
            user: this.props.user,
        });
    };

    deleteUser = async (userid) => {
        await this.props.dispatch(deleteMember(userid));
        console.log(userid)
    }
    render() {
        const { user } = this.state;
        const list = user.userList;
        console.log(list);
        return (
            <div style={{ paddingTop:'100px'}}>
                <div className="table-div"></div>
                <h3 className="list-book">List All Users</h3>
                <table class="darkTable">
                    <thead>
                        <tr>
                            <th >No</th>
                            <th>Ktp</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>    
                        </tr>
                    </thead>
                    {list &&
                        list.length > 0 &&
                        list.map((item, index) => {
                            return (
                                <tbody>
                                    <tr key={index}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td style={{ textAlign: 'center' }}>{item.user_ktp}</td>
                                        <td><Link style={{ textDecoration: 'none', color: 'black' }} to={{pathname:`/admin/${item.userid}`, data:item}} >{item.fullname}</Link></td>
                                        <td>{item.email}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <a href='/admin/'>
                                                <button className='button2' onClick={() => this.deleteUser(item.userid)}>Delete</button>
                                            </a>
                                        </td>
                                       
                                    </tr>
                                </tbody>

                            )
                        })}
                </table>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Member);