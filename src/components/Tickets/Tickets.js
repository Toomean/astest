
import React from 'react';
import Ticket from '../Ticket/Ticket';

const tickets = ( props ) => {
    return props.tickets.map( ( ticket, index ) => {
        return (
            <Ticket
                key={ index }
                ticket={ ticket }/>
        );
    } );
};

export default tickets;
