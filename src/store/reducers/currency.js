
import { CHANGE_CURRENCY, SET_CURRENCIES } from 'store/actions/actionTypes';
import { updateObject } from 'store/utility';

const CURRENCIES_DEFAULT = {
    RUB : 1,
    EUR : 77,
    USD : 66,
};

const initialState = {
    currency   : 'RUB',
    currencies : {
        RUB : {
            value   : CURRENCIES_DEFAULT.RUB,
            checked : true,
            sign    : '₽',
        },
        USD : {
            value   : CURRENCIES_DEFAULT.USD,
            checked : false,
            sign    : '$',
        },
        EUR : {
            value   : CURRENCIES_DEFAULT.EUR,
            checked : false,
            sign    : '€',
        },
    },
    checkedCurrency : {
        value   : CURRENCIES_DEFAULT.RUB,
        checked : true,
        sign    : '₽',
    },
};

const reducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case CHANGE_CURRENCY:
            const currentCurrencies = { ...state.currencies };
            const currencyChecked = action.currencyKey;

            if ( currentCurrencies[ currencyChecked ].checked ) {
                return state;
            }

            for ( var key in currentCurrencies ) {
                currentCurrencies[ key ].checked = key === currencyChecked ? true : false;
            }

            return updateObject( state, {
                currencies : currentCurrencies,
                checkedCurrency : currentCurrencies[ currencyChecked ],
            } );
        case SET_CURRENCIES:
            return updateObject( state, { curencies: action.currencies } );
        default:
            return state;
    }
};

export default reducer;