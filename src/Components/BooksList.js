import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import '../assets/BooksList.css';

import { getPagination, deleteBook } from '../Publics/redux/actions/book';
import { getUserId } from '../Publics/redux/actions/user';

class Books extends Component {
    state = {
        index: '',
        books: [],
        user: [],
        page: 1
    };
    componentDidMount = async () => {
        const userid = localStorage.userid;
        const page = this.state.page;
        await this.props.dispatch(getPagination(page));
        this.setState({
            books: this.props.book,
        });
        await this.props.dispatch(getUserId(userid));
        this.setState({
            user: this.props.user,
        });
    };
    render() {
        const confirm = (bookid) => {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will delete this Book!!!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((buttons) => {
                    if (buttons) {
                        del(bookid)
                        swal("Poof! Your book has been deleted!", {
                            icon: "success",
                        });
                        window.location.href = '/books/'
                    } else {
                        swal("Your file is safe!");
                    }
                }).catch((dangerMode) => {
                    window.location.href = '/books/'
                })
        }
        let del = async (bookid) => {
            await this.props.dispatch(deleteBook(bookid));
        };
        //book list
        const { books } = this.state;
        const list = books.bookList;
        //user list
        const { user } = this.state;
        const users = user.userList;
        const status = users ? users[0].status : '';
        let next = async () => {
            this.setState({
                page:this.state.page + 1
            })
            const page = this.state.page;
            await this.props.dispatch(getPagination(page));
            this.setState({
                books: this.props.book,
            });
        }
        let prev = async () => {
            const page = this.state.page;
            await this.props.dispatch(getPagination(page - 1));
            this.setState({
                books: this.props.book,
            });
        }
        console.log(this.state.page)
        return (
            <div>
                <div className="table-div"></div>
                <h3 className="list-book">List All Books</h3>
                <table class="darkTable">
                    <thead>
                        <tr>
                            <th >No</th>
                            <th>Book Name</th>
                            <th>Writer</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Status</th>

                            {// eslint-disable-next-line
                                status != 'admin' ?
                                    ('') : (<th>Action</th>)}
                        </tr>
                    </thead>
                    {list &&
                        list.length > 0 &&
                        list.map((item, index) => {
                            return (
                                <tbody>
                                    <tr key={index}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td><a style={{ textDecoration: 'none', color: 'black' }} href={`/book/${item.bookid}`}>{item.name}</a></td>
                                        <td>{item.writer}</td>
                                        <td>{item.category}</td>
                                        <td>{item.location}</td>
                                        {// eslint-disable-next-line
                                            item.status_borrow == 1 ?
                                                (<td>Not Available</td>) : (<td>Available</td>)}

                                        {// eslint-disable-next-line
                                            status != 'admin' ?
                                                ('') :
                                                (<td style={{ textAlign: 'center' }}>
                                                    <Link to={`/books/${item.bookid}`}>
                                                        <button className='button1'>Edit</button>
                                                    </Link>

                                                    <button className='button2' onClick={() => confirm(item.bookid)}>Delete</button>

                                                </td>)}
                                    </tr>
                                </tbody>

                            )
                        })}
                </table>
                <div className='button-next'>
                    <button style={{
                        color: 'white',
                        backgroundColor: 'black',
                        marginRight: '10px'
                    }}
                        onClick={prev}>Prev</button>

                    <button style={{
                        color: 'white',
                        backgroundColor: 'black',
                        marginRight: '10px'
                    }}
                        onClick={next}>Next</button>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        book: state.book,
        user: state.user
    };
};

export default connect(mapStateToProps)(Books);