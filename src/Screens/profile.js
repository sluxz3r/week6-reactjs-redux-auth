import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { userBorrows } from '../Publics/redux/actions/borrow';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            borrow: []
        }
    }
    componentDidMount = async () => {
        const user_ktp = localStorage.ktp
        console.log(user_ktp)
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
                    <h3>Nama : {localStorage.name}</h3>
                    <h3>No KTP : {localStorage.ktp}</h3>
                    {localStorage.status == 1 ? (<h3>Status : Member</h3>):('')}
                </div>
                <div>
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
export default connect(mapStateToProps)(Profile);