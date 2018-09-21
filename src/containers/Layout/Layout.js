
import React, { Component } from 'react';
import './Layout.scss';

import Aside from 'components/Aside/Aside';
import Main from 'components/Main/Main';
import ticketsJSON from 'tickets.json';

import axios from 'axios'

export const AppContext = React.createContext();

const CURRENCIES_DEFAULT = {
    RUB : 1,
    EUR : 77,
    USD : 66,
};

class Layout extends Component {

    constructor( props ) {
        super( props );

        const tickets = ticketsJSON.tickets;
        const stopsFilter = this.generateStopsArray( tickets );

        this.state = {
            currency : 'RUB',
            tickets,
            filteredTickets : [ ...tickets ],
            stopsFilter,
            allStopsChecked : true,
            currencies : {
                RUB : {
                    value : CURRENCIES_DEFAULT.RUB,
                    checked : true,
                    sign : '₽',
                },
                USD : {
                    value : CURRENCIES_DEFAULT.USD,
                    checked : false,
                    sign : '$',
                },
                EUR : {
                    value : CURRENCIES_DEFAULT.EUR,
                    checked : false,
                    sign : '€',
                }
            },
            checkedCurrency : {
                value : CURRENCIES_DEFAULT.RUB,
                checked : true,
                sign : '₽',
            },

            /* Provided methods of stops filters */
            stopsFilterChangeHandler : ( event, changedStop ) => {
                const stopsFilter = [ ...this.state.stopsFilter ];
                const changedStopState = event.target.checked;
                const changedStopIndex = stopsFilter.findIndex( filterItem => filterItem.value === changedStop.value );
                let allStopsChecked = this.state.allStopsChecked;

                stopsFilter[ changedStopIndex ].checked = changedStopState;
                
                const hasAllChecked = !!!stopsFilter.filter( filterItem => !filterItem.checked ).length;

                if ( !hasAllChecked === allStopsChecked  ) {
                    allStopsChecked = !allStopsChecked;
                }

                this.setState( {
                    stopsFilter     : stopsFilter,
                    allStopsChecked : allStopsChecked,
                } );

                this.filterTickets();
            },
            stopsFilterChangedOnlyHandler : ( changedStop ) => {
                const stopsFilter = [ ...this.state.stopsFilter ];
                stopsFilter.forEach( filterItem => {
                    filterItem.checked = filterItem.value === changedStop.value;
                } )

                this.setState( {
                    stopsFilter     : stopsFilter,
                    allStopsChecked : false,
                } );

                this.filterTickets();
            },
            allStopsFilterChangeHandler : ( event ) => {
                const allChecked = event.target.checked;

                this.changeAllChecked( allChecked );
                this.filterTickets();
            },

            /* Provided methods of currency changer */
            switchCurrencyHandler : ( newCurrency ) => {
                const currentCurrencies = { ...this.state.currencies };

                if ( currentCurrencies[ newCurrency ].checked ) {
                    return;
                }

                for ( var key in currentCurrencies ) {
                    currentCurrencies[ key ].checked = key === newCurrency ? true : false;
                }

                this.setState( {
                    currencies : currentCurrencies,
                    checkedCurrency : currentCurrencies[ newCurrency ],
                } );
            },
        }
    }

    generateStopsArray = ( tickets ) => {
        return tickets
            .map( ticket => ticket.stops )
            .filter( ( stop, index, arr ) => arr.indexOf( stop ) === index )
            .sort()
            .map( stop => ( {
                checked : true,
                value   : stop,
            } ) );
    }

    filterTickets = () => {
        const stopsFilter = [ ...this.state.stopsFilter ]
            .filter( stopFilterItem => stopFilterItem.checked )
            .map( stopFilterItem => stopFilterItem.value );

        const tickets = [ ...this.state.tickets ]
            .filter( ticket => stopsFilter.includes( ticket.stops ) );

        this.setState( {
            filteredTickets : tickets,
        } );
    }

    changeAllChecked = ( value ) => {
        const stopsFilter = [ ...this.state.stopsFilter ];

        stopsFilter.forEach( filterItem => filterItem.checked = value );

        this.setState( {
            allStopsChecked : value,
            stopsFilter     : stopsFilter,
        } );

        this.filterTickets();
    }

    async getCurrencies () {
        const currencies = {
            RUB : CURRENCIES_DEFAULT.RUB,
            EUR : CURRENCIES_DEFAULT.EUR,
            USD : CURRENCIES_DEFAULT.USD,
        };

        try {
            const response = await axios.get( 'https://www.cbr-xml-daily.ru/daily_json.js' );

            const { EUR, USD } = response
                && response.data
                && response.data.Valute;

            currencies.EUR = ( EUR && EUR.Value ) || currencies.EUR;
            currencies.USD = ( USD && USD.Value ) || currencies.USD;

            return currencies;
        }
        catch( error ) {
            console.log( error );

            return currencies;
        }
    }

    async setCurrencies () {
        const externalCurrencies = await this.getCurrencies();
        const currentCurrencies = { ...this.state.currencies };

        currentCurrencies.RUB.value = externalCurrencies.RUB;
        currentCurrencies.USD.value = externalCurrencies.USD;
        currentCurrencies.EUR.value = externalCurrencies.EUR;

        this.setState( {
            currencies : currentCurrencies,
        } );
    }

    componentDidMount () {
        this.setCurrencies();
    }

    render () {
        return (
            <div className="Layout">
                <AppContext.Provider value={ this.state }>
                    <Aside />
                    <Main tickets={ this.state.filteredTickets }/>
                </AppContext.Provider>
            </div>
        );
    }
};

export default Layout;
