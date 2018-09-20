
import React from 'react';
import './CurrencySwitch.scss';

const currencySwitch = () => {
    return (
        <div className="CurrencySwitch">
            <div className="CurrencySwitch__button CurrencySwitch__button--active">
                RUB
            </div>
            <div className="CurrencySwitch__button">
                USD
            </div>
            <div className="CurrencySwitch__button">
                EUR
            </div>
        </div>
    );
};

export default currencySwitch;
