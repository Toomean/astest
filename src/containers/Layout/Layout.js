
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrencies } from 'store/actions/currency';
import { getTickets } from 'store/actions/tickets';

import './Layout.scss';

import Aside from 'components/Aside/Aside';
import Main from 'components/Main/Main';

class Layout extends Component {
    async componentDidMount () {
        await this.props.getTickets();
        await this.props.getCurrencies();
    }

    render () {
        return (
            <div className="Layout">
                <Aside />
                <Main />
            </div>
        );
    }
};

const mapStateToProps = state => ( {} );

const mapDispatchToProps = dispatch => {
    return {
        getCurrencies : () => dispatch( getCurrencies() ),
        getTickets    : () => dispatch( getTickets() ),
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( Layout );
