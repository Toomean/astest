
import React, { Component } from 'react';
import Tickets from '../Tickets/Tickets';

class Main extends Component {
    render () {
        return (
            <main>
                <Tickets tickets={ this.props.tickets }/>
            </main>
        );
    }
}

export default Main;
