
import React, { Component } from 'react';
import './Aside.scss';

import Aux from 'hoc/Aux';
import AsideGroup from './AsideGroup/AsideGroup';
import CurrencySwitch from './CurrencySwitch/CurrencySwitch';
import StopsFilter from './StopsFilter/StopsFilter';

import { AppContext } from 'containers/Layout/Layout';

class Aside extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            asideOpened : false,
        };
    }

    toggleAside = () => {
        this.setState( {
            asideOpened : !this.state.asideOpened,
        } );
    }

    render () {

        const asideClasses = [
            'Aside',
            this.state.asideOpened ? 'Aside--opened' : null,
        ].join(' ');

        return (
            <Aux>
                <button
                    className="Aside__button"
                    onClick={ this.toggleAside }>{ this.state.asideOpened ? '✕' : '☰'  }</button>
                <aside className={ asideClasses } >
                    <AsideGroup title="Валюта">
                        <AppContext.Consumer>
                            { state => <CurrencySwitch currencies={ state.currencies } switched={ state.switchCurrencyHandler } /> }
                        </AppContext.Consumer>
                    </AsideGroup>
    
                    <AsideGroup title="Количество пересадок">
                        <AppContext.Consumer>
                            { state => <StopsFilter stopsFilter={ state.stopsFilter }  /> }
                        </AppContext.Consumer>
                    </AsideGroup>            
                </aside>
            </Aux>
        );
    }
};

export default Aside;
