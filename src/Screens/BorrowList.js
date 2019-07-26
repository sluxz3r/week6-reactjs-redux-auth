import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { userBorrows } from '../Publics/redux/actions/borrow';

class BorrowList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            borrow: []
        }
    }
    componentDidMount = async () => {
        const user_ktp = this.props.location.data.user_ktp
        await this.props.dispatch(userBorrows(user_ktp));
        this.setState({
            borrow: this.props.borrow,
        });
    };
    render() {
        const { borrow } = this.state;
        const list = borrow.borrowList;
        console.log(list);
        return (
            <div style={{ paddingTop: '100px' }}>
                <div>
                    <table style={{ marginLeft: '30px' }}>
                        <tr>
                            <th style={{ paddingRight: '40px' }}> Name</th>
                            <th>: {this.props.location.data.fullname}</th>
                        </tr>
                        <tr>
                            <th>No KTP</th>
                            <th>: {this.props.location.data.user_ktp}</th>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <th>: {this.props.location.data.email}</th>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <th>: Member</th>
                        </tr>
                    </table>
                </div>
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

            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        borrow: state.borrow
    };
};
export default connect(mapStateToProps)(BorrowList);