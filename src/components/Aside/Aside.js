
import React, { Component, Fragment } from 'react';
import './Aside.scss';

import AsideGroup from './AsideGroup/AsideGroup';
import CurrencySwitch from './CurrencySwitch/CurrencySwitch';
import StopsFilter from './StopsFilter/StopsFilter';

import { AppContext } from 'containers/Layout/Layout';

class Aside extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            asideShown : false,
        };
    }

    toggleAside = () => {
        this.setState( {
            asideShown : !this.state.asideShown,
        } );
    }

    render () {

        const asideClasses = [
            'Aside',
            this.state.asideShown ? 'Aside--opened' : null,
        ].join(' ');

        return (
            <Fragment>
                <button
                    className="Aside__button"
                    onClick={ this.toggleAside }>{ this.state.asideShown ? '✕' : '☰'  }</button>
                <aside className={ asideClasses }>
                    <AsideGroup title="Валюта">
                        <CurrencySwitch />
                    </AsideGroup>
    
                    <AsideGroup title="Количество пересадок">
                        <AppContext.Consumer>
                            { state => <StopsFilter stopsFilter={ state.stopsFilter }  /> }
                        </AppContext.Consumer>
                    </AsideGroup>            
                </aside>
            </Fragment>
        );
    }
};

export default Aside;
