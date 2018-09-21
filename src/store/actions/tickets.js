
import {
    SET_TICKETS,
    FILTER_TICKETS,
    SET_STOPS,
    CHANGE_FILTER,
    CHANGE_FILTER_ONLY,
    CHANGE_ALL_STOPS
} from 'store/actions/actionTypes';

import axios from 'axios';


export const changeFilter = ( event, changedStop ) => {
    return ( dispatch, getState ) => {
        const stopsFilter = [ ...getState().tickets.stopsFilter ];
        const changedStopState = event.target.checked;
        const changedStopIndex = stopsFilter.findIndex( filterItem => filterItem.value === changedStop.value );
        let allStopsChecked = getState().tickets.allStopsChecked;

        stopsFilter[ changedStopIndex ].checked = changedStopState;
        
        const hasAllChecked = !!!stopsFilter.filter( filterItem => !filterItem.checked ).length;

        if ( !hasAllChecked === allStopsChecked  ) {
            allStopsChecked = !allStopsChecked;
        }

        dispatch( [
            {
                type            : CHANGE_FILTER,
                stopsFilter     : stopsFilter,
                allStopsChecked : allStopsChecked,
            },
            filterTickets()
        ] ); 
    };
};

export const changeFilterOnly = ( changedStop ) => {
    return ( dispatch, getState ) => {
        const stopsFilter = [ ...getState().tickets.stopsFilter ];

        stopsFilter.forEach( filterItem => {
            filterItem.checked = filterItem.value === changedStop.value;
        } );

        dispatch( [
            {
                type            : CHANGE_FILTER_ONLY,
                stopsFilter     : stopsFilter,
                allStopsChecked : false,
            },
            filterTickets()
        ] ); 
    };
    
};

export const changeAllStops = ( event ) => {
    return ( dispatch, getState ) => {
        const allChecked = event.target.checked;
        const stopsFilter = [ ...getState().tickets.stopsFilter ];

        stopsFilter.forEach( filterItem => filterItem.checked = allChecked );

        dispatch( [
            {
                type            : CHANGE_ALL_STOPS,
                stopsFilter     : stopsFilter,
                allStopsChecked : allChecked,
            },
            filterTickets()
        ] ); 
    };
    
};

export const setStops = ( tickets ) => {
    const stops = tickets
            .map( ticket => ticket.stops )
            .filter( ( stop, index, arr ) => arr.indexOf( stop ) === index )
            .sort()
            .map( stop => ( {
                checked : true,
                value   : stop,
            } ) );

    return {
        type        : SET_STOPS,
        stopsFilter : stops,
    }
};

export const setTickets = ( tickets ) => {
    return {
        type    : SET_TICKETS,
        tickets : tickets,
    }
};

export const filterTickets = () => {
    return {
        type : FILTER_TICKETS,
    };
};

export const getTickets = () => {
    return async ( dispatch, getState ) => {
        try {
            const response = await axios.get( 'tickets.json');

            const tickets = response
                && response.data
                && response.data.tickets;

            dispatch( [
                setTickets( tickets ),
                setStops( tickets ),
            ] );
        }
        catch( error ) {
            console.log( error );
        }
    };
};
