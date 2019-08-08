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
        const confirm = (bookid) => {
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
                        });
                    } else {
                        swal("Your file is safe!");
                    }
                }).catch((dangerMode) => {
                    window.location.href = '/books/'
                })
        }
        let del = async (bookid) => {
            await this.props.dispatch(editPending(bookid));
        };
        const { pending } = this.state;
        const list = pending.pendingList;
        return (
            <div style={{ paddingTop: '10px' }}>
                <div className="table-div"></div>
                <h3 className="list-book">List Pending Books</h3>
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
                </table>
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