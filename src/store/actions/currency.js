
import { CHANGE_CURRENCY, SET_CURRENCIES } from './actionTypes';
import axios from 'axios';

export const changeCurrency = ( currencyKey ) => {

    console.log( 'Key: ', currencyKey )

    return {
        type        : CHANGE_CURRENCY,
        currencyKey : currencyKey,
    }
};

export const setCurrencies = ( currencies ) => {
    return {
        type       : SET_CURRENCIES,
        currencies : currencies,
    };
};

export const getCurrencies = () => {
    return async ( dispatch, getState ) => {
        const currencies = { ...getState().currency.currencies }; 

        try {
            const response = await axios.get( 'https://www.cbr-xml-daily.ru/daily_json.js' );

            const { EUR, USD } = response
                && response.data
                && response.data.Valute;

            currencies.EUR = ( EUR && EUR.Value ) || currencies.EUR;
            currencies.USD = ( USD && USD.Value ) || currencies.USD;

            dispatch( setCurrencies( currencies ) );
        }
        catch( error ) {
            console.log( error );
        }
    }
}