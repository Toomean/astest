
import React from 'react';
import './CurrencySwitch.scss';

const currencySwitch = ( props ) => {
    const currencyButtons = Object.keys( props.currencies )
        .map( currencyKey => {
            const isActive = props.currencies[ currencyKey ].checked
                ? 'CurrencySwitch__button--active'
                : null;
            const buttonClasses = [
                'CurrencySwitch__button',
                isActive
            ].join(' ')

            return (
                <div
                    className={ buttonClasses }
                    key={currencyKey}
                    onClick={ event => props.switched( currencyKey ) }>
                    { currencyKey }
                </div>
            );
        }
    );

    return (
        <div className="CurrencySwitch">
            { currencyButtons }
        </div>
    );
};

export default currencySwitch;
