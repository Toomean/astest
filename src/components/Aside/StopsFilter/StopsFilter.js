
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CheckboxItem from 'components/CheckboxItem/CheckboxItem';
import { AppContext } from 'containers/Layout/Layout';

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
                <AppContext.Consumer  key={ value }>
                    { state => <CheckboxItem
                        title={ checkboxTitle }
                        checked={ checked }
                        changedOnly={ event => state.stopsFilterChangedOnlyHandler( stopsItem ) }
                        changed={ event => state.stopsFilterChangeHandler( event, stopsItem ) } />
                    }
                </AppContext.Consumer>
                
            );
        } );

    return (
        <Fragment>
            <AppContext.Consumer>
                { state => <CheckboxItem 
                    title="Все"
                    checked={ state.allStopsChecked }
                    cantBeCheckedOnly={ true }
                    changed={ event => state.allStopsFilterChangeHandler( event ) } />
                }
            </AppContext.Consumer>

            { generatedCheckboxes }
        </Fragment>
    );
};

stopsFilter.propTypes = {
    stops : PropTypes.arrayOf( PropTypes.object ) ,
};

export default stopsFilter;
