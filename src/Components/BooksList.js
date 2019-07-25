import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/BooksList.css';

import { getBooks, deleteBook } from '../Publics/redux/actions/book';
import { getUserId } from '../Publics/redux/actions/user';

class Books extends Component {
    state = {
        index: '',
        books: [],
        user:[],
    };
    componentDidMount = async () => {
        const userid = localStorage.userid;
        await this.props.dispatch(getBooks());
        this.setState({
            books: this.props.book,
        });
        await this.props.dispatch(getUserId(userid));
        this.setState({
            user: this.props.user,
        });
    };

    deleteBook = async (bookid) => {
        await this.props.dispatch(deleteBook(bookid));
        console.log(bookid)
    }

    render() {
        //book list
        const { books } = this.state;
        const list = books.bookList;
        //user list
        const { user } = this.state;
        const users = user.userList;
        const status = users ? users[0].status : '';
        console.log(status)

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
                            {status != 'admin' ?
                            (''): (<th>Action</th>)}
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
                                        {item.status_borrow == 1 ? 
                                        ( <td>Not Available</td> ) : ( <td>Available</td> )}
                                        
                                        {status != 'admin' ?
                                        (''):
                                        (<td style={{ textAlign: 'center' }}>
                                            <Link to={`/books/${item.bookid}`}>
                                                <button className='button1'>Edit</button>
                                            </Link>
                                            <a href='/books/'>
                                                <button className='button2' onClick={() => this.deleteBook(item.bookid)}>Delete</button>
                                            </a>
                                        </td>)}
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
        book: state.book,
        user: state.user
    };
};

export default connect(mapStateToProps)(Books);