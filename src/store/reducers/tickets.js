
import {
    SET_TICKETS,
    FILTER_TICKETS,
    CHANGE_FILTER,
    CHANGE_FILTER_ONLY,
    CHANGE_ALL_STOPS
} from 'store/actions/actionTypes';
import { updateObject } from 'store/utility';
import { SET_STOPS } from '../actions/actionTypes';

const initialState = {
    tickets         : [],
    ticketsFilteres : [],
    stopsFilter     : [],
    allStopsChecked : true,
};

const reducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case SET_TICKETS:
            return updateObject( state, {
                tickets         : [ ...action.tickets ],
                ticketsFiltered : [ ...action.tickets ],
            } );
        case FILTER_TICKETS:
            const stopsFilter = [ ...state.stopsFilter ]
                .filter( stopFilterItem => stopFilterItem.checked )
                .map( stopFilterItem => stopFilterItem.value );

            const tickets = [ ...state.tickets ]
                .filter( ticket => stopsFilter.includes( ticket.stops ) );

            return updateObject( state, { ticketsFiltered : tickets } );
        case SET_STOPS:
            return updateObject( state, { stopsFilter : action.stopsFilter } );
        case CHANGE_FILTER:
        case CHANGE_FILTER_ONLY:
        case CHANGE_ALL_STOPS:
            return updateObject( state, {
                stopsFilter     : action.stopsFilter,
                allStopsChecked : action.allStopsChecked, 
            } );
        default:
            return state;
    }
};

export default reducer;
