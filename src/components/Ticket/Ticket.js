
import React from 'react';

import NumberFormat from 'react-number-format';

import './Ticket.scss';
import airlineLogo from 'assets/ta.png';
import plural from 'plural-ru';

const ticket = ( props ) => {
    const { ticket } = props;
    const originCity = [ ticket.origin, ticket.origin_name ]
        .filter(n => n)
        .join(', ');
    const destinationCity = [ ticket.destination_name, ticket.destination ]
        .filter(n => n)
        .join(', ');

    return (
        <section className="Ticket">
            <div className="Ticket__header">
                <div className="Ticket__airline">
                    <img src={ airlineLogo } alt={ ticket.carrier } />
                </div>
                <button className="Ticket__button">
                    <div>Купить</div>
                        <NumberFormat
                            value={ ticket.price }
                            displayType={'text'}
                            thousandSeparator={' '}
                            prefix={'за '}
                            suffix={'₽'} />
                </button>
            </div>
            <div className="Ticket__content">
                <div className="Ticket__origin">
                    <div className="Ticket__time">{ ticket.departure_time }</div>
                    <div className="Ticket__city">{ originCity }</div>
                    <div className="Ticket__date">{ ticket.departure_date }</div>
                </div>
                <div className="Ticket__path">
                    <div className="Ticket__stops">{ plural( ticket.stops , '%d пересадка', '%d пересадки', '%d пересадок') }</div>
                </div>
                <div className="Ticket__destination">
                    <div className="Ticket__time">{ ticket.arrival_time }</div>
                    <div className="Ticket__city">{ destinationCity }</div>
                    <div className="Ticket__date">{ ticket.arrival_date }</div>
                </div>
            </div>
        </section>
    );
};

export default ticket;
