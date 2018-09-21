
import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/currency';

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
                    onClick={ () => props.changeCurrency( currencyKey ) }>
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

const mapStateToProps = state => {
    return {
        currencies      : state.currency.currencies,
        currencyChecked : state.currency.checkedCurrency,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrencies: () => dispatch( actionCreators.getCurrencies() ),
        changeCurrency: ( currencyKey ) => dispatch( actionCreators.changeCurrency( currencyKey ) )
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( currencySwitch );
