import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import '../assets/BookList.css';

import { pendingBooks, editPending } from '../Publics/redux/actions/pending';

class Pending extends Component {
    state = {
        index: '',
        pending: [],
    };
    componentDidMount = async () => {
        await this.props.dispatch(pendingBooks());
        this.setState({
            pending: this.props.pending,
        });
    };

    render() {
        const confirm = async (bookid) => {
            swal({
                title: "Are you sure?",
                text: "You will Approve this Book!!!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((buttons) => {
                    if (buttons) {
                        del(bookid)
                        swal("Poof! Your book has been Approve!", {
                            icon: "success",
                            buttons: false,
                        });
                    } else {
                        swal("Your file is safe!");
                    }setTimeout(function () { window.location.href = '/admin/pending/' }, 1000);
                })
        }
        let del = async (bookid) => {
            await this.props.dispatch(editPending(bookid));
        };
        const { pending } = this.state;
        const list = pending.pendingList;
        console.log(list)
        return (
            <div style={{ paddingTop: '10px' }}>
                <div className="table-div"></div>
                <h3 className="list-book">List Pending Books</h3>
                {list == 0 ? (<h3 style={{textAlign: "center", textDecoration: 'none', paddingTop: '100px', fontSize:'30', fontWeight:'bold' }}>No Data</h3>):(
                <table class="darkTable">
                    <thead>
                        <tr>
                            <th >No</th>
                            <th>Book Name</th>
                            <th>Writer</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {list &&
                        list.length > 0 &&
                        list.map((item, index) => {
                            return (
                                <tbody>
                                    <tr key={index}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.writer}</td>
                                        <td>{item.category}</td>
                                        <td>{item.location}</td>
                                        <td style={{ textAlign: 'center' }}><button className="button3" onClick={() => confirm(item.bookid)}>Approve</button></td>
                                    </tr>
                                </tbody>

                            )
                        })}
                </table>)}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        pending: state.pending,
    };
};

export default connect(mapStateToProps)(Pending);