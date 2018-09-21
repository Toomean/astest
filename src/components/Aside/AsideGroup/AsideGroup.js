
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const asideGroup = ( props ) => {
    return (
        <Fragment>
            <div className="Aside__heading">{ props.title }</div>
            { props.children }
        </Fragment>
    );
};

asideGroup.propTypes = {
    title  : PropTypes.string,
};

export default asideGroup;
