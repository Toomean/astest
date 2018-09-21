
import * as actionTypes from './actions/actions';

const CURRENCIES_DEFAULT = {
    RUB : 1,
    EUR : 77,
    USD : 66,
};

const initialState = {
    currency        : 'RUB',
    tickets         : [],
    filteredTickets : [],
    stopsFilter     : [],
    allStopsChecked : true,
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
        }
    },
    checkedCurrency : {
        value   : CURRENCIES_DEFAULT.RUB,
        checked : true,
        sign    : '₽',
    },

}

const reducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case actionTypes.CHANGE_FILTER:
            return {
                ...state,
            };
        case actionTypes.CHANGE_FILTER_ONLY:
            return {
                ...state,
            };
        case actionTypes.CHANGE_ALL_STOPS:
            return {
                ...state,
            };
        case actionTypes.CHANGE_CURRENCY:
            return {
                ...state,
            };
        default:
            return state;
    }
}

export default reducer;
