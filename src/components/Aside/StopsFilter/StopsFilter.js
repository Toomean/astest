
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { changeFilter, changeFilterOnly, changeAllStops } from 'store/actions/tickets';

import CheckboxItem from 'components/CheckboxItem/CheckboxItem';

import plural from 'plural-ru';

const stopsFilter = ( props ) => {
    const generatedCheckboxes = props.stopsFilter
        .map( stopsItem => {
            const value = stopsItem.value;
            const checked = stopsItem.checked;

            const checkboxTitlePrefix = value === 0 ? 'Без' : '%d';
            const checkboxTitle = plural(
                value,
                '%d пересадка',
                '%d пересадки',
                `${ checkboxTitlePrefix } пересадок`
            );

            return (
                <CheckboxItem
                    key={ value }
                    title={ checkboxTitle }
                    checked={ checked }
                    changedOnly={ event => props.changeFilterOnly( stopsItem ) }
                    changed={ event => props.changeFilter( event, stopsItem ) } />
            );
        } );

    return (
        <Fragment>
            <CheckboxItem 
                title="Все"
                checked={ props.allStopsChecked }
                cantBeCheckedOnly={ true }
                changed={ event => props.changeAllStops( event ) } />

            { generatedCheckboxes }
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        stopsFilter     : state.tickets.stopsFilter,
        allStopsChecked : state.tickets.allStopsChecked,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeFilter     : ( event, stopsItem ) => dispatch( changeFilter( event, stopsItem ) ),
        changeFilterOnly : ( stopsItem ) => dispatch( changeFilterOnly( stopsItem ) ),
        changeAllStops   : ( event ) => dispatch( changeAllStops( event ) ),
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( stopsFilter );
