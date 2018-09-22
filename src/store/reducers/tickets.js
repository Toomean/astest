
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
            const ticketsSet = [ ...action.tickets ]
                .sort( ( next, prev ) => next.stops - prev.stops );

            return updateObject( state, {
                tickets         : [ ...ticketsSet ],
                ticketsFiltered : [ ...ticketsSet ],
            } );
        case FILTER_TICKETS:
            const stopsFilter = [ ...state.stopsFilter ]
                .filter( stopFilterItem => stopFilterItem.checked )
                .map( stopFilterItem => stopFilterItem.value );

            const ticketsCurrent = [ ...state.tickets ]
                .filter( ticket => stopsFilter.includes( ticket.stops ) );

            return updateObject( state, { ticketsFiltered : ticketsCurrent } );
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
