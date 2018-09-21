
import React from 'react';
import { connect } from 'react-redux';

import Tickets from '../Tickets/Tickets';

const main = ( props ) =>  {
    return (
        <main>
            <Tickets tickets={ props.ticketsFiltered || [] }/>
        </main>
    );
};

const mapStateToProps = state => {
    return {
        ticketsFiltered : state.tickets.ticketsFiltered,
    }
};

export default connect( mapStateToProps )( main );
