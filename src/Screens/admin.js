import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import '../assets/BookList.css';

import { getUser, deleteMember } from '../Publics/redux/actions/member';

class Member extends Component {
    state = {
        index: '',
        member: [],
    };
    componentDidMount = async () => {
        await this.props.dispatch(getUser());
        this.setState({
            member: this.props.member,
        });
    };

    render() {
        const confirm = (userid) => {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will delete this User!!!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((buttons) => {
                    if (buttons) {
                        del(userid)
                        swal("Poof! Your Member has been deleted!", {
                            icon: "success",
                        });
                        window.location.href = '/admin/'
                    } else {
                        swal("Your Member is safe!");
                    }
                }).catch((dangerMode) => {
                    window.location.href = '/admin/'
                })
        }
        let del = async (userid) => {
            await this.props.dispatch(deleteMember(userid));
        };
        const { member } = this.state;
        const list = member.memberList;
        return (
            <div style={{ paddingTop: '10px' }}>
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
                                        <td><Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: `/member/${item.userid}`, data: item }} >{item.fullname}</Link></td>
                                        <td>{item.email}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button className='button2' onClick={() => confirm(item.userid)}>Delete</button>
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
        member: state.member,
    };
};

export default connect(mapStateToProps)(Member);