
import React from 'react';
import { connect } from 'react-redux';

import NumberFormat from 'react-number-format';

import './Ticket.scss';
import airlineLogo from 'assets/ta.png';
import plural from 'plural-ru';
import moment from 'moment';

const ticket = ( props ) => {
    const { ticket } = props;
    const originCity = [ ticket.origin, ticket.origin_name ]
        .filter(n => n)
        .join(', ');
    const destinationCity = [ ticket.destination_name, ticket.destination ]
        .filter(n => n)
        .join(', ');
    const departureDate = moment( new Date( ticket.departure_date ) ).format('DD MMM YYYY, dd');
    const arrivalDate = moment( new Date( ticket.arrival_date ) ).format('DD MMM YYYY, dd');

    return (
        <section className="Ticket">
            <div className="Ticket__header">
                <div className="Ticket__airline">
                    <img src={ airlineLogo } alt={ ticket.carrier } />
                </div>
                <button className="Ticket__button">
                    <div>Купить</div>
                        <NumberFormat
                            value={ ( ticket.price / props.checkedCurrency.value ).toFixed() }
                            displayType={'text'}
                            thousandSeparator={' '}
                            prefix={'за '}
                            suffix={ props.checkedCurrency.sign } />
                </button>
            </div>
            <div className="Ticket__content">
                <div className="Ticket__origin">
                    <div className="Ticket__time">{ ticket.departure_time }</div>
                    <div className="Ticket__city">{ originCity }</div>
                    <div className="Ticket__date">{ departureDate }</div>
                </div>
                <div className="Ticket__path">
                    <div className="Ticket__stops">{ plural( ticket.stops , '%d пересадка', '%d пересадки', '%d пересадок') }</div>
                </div>
                <div className="Ticket__destination">
                    <div className="Ticket__time">{ ticket.arrival_time }</div>
                    <div className="Ticket__city">{ destinationCity }</div>
                    <div className="Ticket__date">{ arrivalDate }</div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = state => {
    return {
        checkedCurrency : state.currency.checkedCurrency,
    }
};

export default connect( mapStateToProps )( ticket );
