import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

class Logout extends Component {
    constructor(props) {
        super(props)
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('userid')
        localStorage.removeItem('name')
    }
    render() {
        return (
            <div>
                <Redirect></Redirect>
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