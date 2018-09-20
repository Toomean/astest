
import React from 'react';
import Tickets from '../Tickets/Tickets';

const main = ( props ) =>  {
    return (
        <main>
            <Tickets tickets={ props.tickets }/>
        </main>
    );
};

export default main;
