import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'

class Logout extends Component {
    constructor(props) {
        super(props)
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('userid')
        localStorage.removeItem('name')
        localStorage.removeItem('status')
        localStorage.removeItem('ktp')
    }
    render() {
        return (
            <div>
                <h3 style={{paddingTop:'100px'}}>Terima Kasih</h3>
                <Redirect to='/login/'/>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        book: state.book
    };
};
export default connect(mapStateToProps)(Logout);