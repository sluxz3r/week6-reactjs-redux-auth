import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getBook } from '../Publics/redux/actions/book';
import { getUserId } from '../Publics/redux/actions/user';
import { getBorrows } from '../Publics/redux/actions/borrow';


import Borrow from '../Components/borrow';
import Restore from '../Components/restore';

import '../assets/bookdetails.css';

class bookdetail extends Component {
    state = {
        books: [],
        user: [],
        borrow:[],
    };

    componentDidMount = async () => {
        const bookid = this.props.match.params.bookid
        const userid = localStorage.userid;
        await this.props.dispatch(getBook(bookid));
        this.setState({
            books: this.props.book,
        });
        await this.props.dispatch(getUserId(userid));
        this.setState({
            user: this.props.user,
        });

		await this.props.dispatch(getBorrows(bookid));
		this.setState({
			borrow: this.props.borrow
		});
    };

    render() {
        //books details
        const { books } = this.state;
        const bookid = this.props.match.params.bookid
        const list = books.bookList;
        const image = list ? list.image : '';
        const name = list ? list.name : '';
        const status = list ? list.status_borrow : '';
        const writer = list ? list.writer : '';
        const des = list ? list.des : '';

        //user detail token
        const { user } = this.state;
        const users = user.userList;
        const ktp = users ? users[0].user_ktp : '';
        const fullname = users ? users[0].fullname : '';
        const ktp_user = this.props.borrow.borrowList[this.props.borrow.borrowList.length -1] ? this.props.borrow.borrowList[this.props.borrow.borrowList.length -1] : '';
        console.log(ktp)
        console.log(ktp_user.user_id)
        return (
            <div>
                <div className='atas'>
                </div>
                <img className='gambar1' src={image} alt="gambar" />
                <div className='book'>

                    <NavLink to="/"><button
                        style={{
                            color: 'white',
                            backgroundColor: 'black',
                            marginBottom: '10px',
                            width: '100px'
                        }}>Back</button>
                    </NavLink>
                        {// eslint-disable-next-line
                            users != undefined ?
                        ( <div> {// eslint-disable-next-line
                            status == 1 ? (
                        <div>{// eslint-disable-next-line
                            ktp == ktp_user.user_id  ?  (<Restore id={bookid} name={name} />):('')}</div>
                        ) 
                        : (<Borrow id={bookid} ktp={ktp} fullname={fullname} name={name}/>)} </div> ):('')}

                </div>
                <div>
                <img className='gambar2' src={image} alt="gambar" />
                {// eslint-disable-next-line
                    status == 1 ? (
                        <button style={{
                            color: 'white',
                            backgroundColor: 'red',
                            marginTop: '10px',
                            width: '120px',
                            marginLeft:'1130px',
                            borderRadius:'10px'
                        }}>
                            Not Available
                        </button>) : (
                            <button style={{
                                color: 'white',
                                backgroundColor: 'Blue',
                                marginTop: '10px',
                                width: '120px',
                                marginLeft:'1130px',
                                borderRadius:'10px'
                            }} >
                                Available
                        </button>
                        )}
                </div>
                <div className='text-besar'>
                    <h1 className="titel">{name}</h1>
                    <p className="desc">Karya : {writer}</p>
                    <p className="desc">{des}</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        book: state.book,
        user: state.user,
        borrow: state.borrow,
    };
};

export default connect(mapStateToProps)(bookdetail);