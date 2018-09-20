
import React, { Component } from 'react';
import './Layout.scss';

import Aside from 'components/Aside/Aside';
import Main from 'components/Main/Main';
import ticketsJSON from 'tickets.json';

class Layout extends Component {

    render () {
        return (
            <div className="Layout">
                <Aside />
                <Main tickets={ ticketsJSON.tickets }/>
            </div>
        );
    }
};

export default Layout;
