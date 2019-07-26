import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { userBorrows } from '../Publics/redux/actions/borrow';
import { getUserId } from '../Publics/redux/actions/user';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            borrow: [],
            user: []
        }
    }
    componentDidMount = async () => {
        const userid = localStorage.userid;
        await this.props.dispatch(getUserId(userid));
        this.setState({
            user: this.props.user,
        });
        const { user } = this.state;
        const users = user.userList;
        const user_ktp = users ? users[0].user_ktp : '';
        await this.props.dispatch(userBorrows(user_ktp));
        this.setState({
            borrow: this.props.borrow,
        });
    };
    render() {
        const { borrow } = this.state;
        const list = borrow.borrowList;

        const { user } = this.state;
        const users = user.userList;
        console.log(users)

        const ktp = users ? users[0].user_ktp : '';
        const fullname = users ? users[0].fullname : '';
        const email = users ? users[0].email : '';
        const status = users ? users[0].status : '';
        return (
            <div>
                {users == undefined ? (<h3 style={{ textAlign: "center", textDecoration: 'none', paddingTop: '100px' }}>Sorry! <a href='/login/' style={{ textDecoration: 'none' }}>Login</a> First</h3>)
                    : (<div style={{ paddingTop: '100px' }}>
                        <table style={{ marginLeft: '30px' }}>
                            <tr>
                                <th style={{ paddingRight: '40px' }}> Name</th>
                                <th>: {fullname}</th>
                            </tr>
                            <tr>
                                <th>No KTP</th>
                                <th>: {ktp}</th>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <th>: {email}</th>
                            </tr>
                            <tr>
                                <th>Status</th>
                                {status != 1 ?
                                    ('') : (<th>: Member</th>)}
                            </tr>
                        </table>
                        <div>
                            <h3 className="list-book">Borrow History</h3>
                            <table class="darkTable">
                                <thead>
                                    <tr>
                                        <th >No</th>
                                        <th>Book Name</th>
                                        <th>Borrow Date</th>
                                        <th>Return Date</th>
                                        <th>Expired Date</th>
                                        <th>Penalty Fee</th>
                                    </tr>
                                </thead>
                                {list &&
                                    list.length > 0 &&
                                    list.map((item, index) => {
                                        return (
                                            <tbody>
                                                <tr key={index}>
                                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.name}</td>
                                                    <td style={{ textAlign: 'center' }}>{moment(item.tanggal_pinjam).format("DD-MM-YYYY")}</td>
                                                    <td style={{ textAlign: 'center' }}>{moment(item.tanggal_kembali).format("DD-MM-YYYY")}</td>
                                                    <td style={{ textAlign: 'center' }}>{moment(item.harus_kembali).format("DD-MM-YYYY")}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.denda}</td>
                                                </tr>
                                            </tbody>

                                        )
                                    })}
                            </table>
                        </div>

                    </div>)}
            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        borrow: state.borrow,
        user: state.user,
    };
};
export default connect(mapStateToProps)(Profile);