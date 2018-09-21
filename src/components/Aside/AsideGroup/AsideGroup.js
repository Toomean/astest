
import React from 'react';
import Aux from 'hoc/Aux';
import PropTypes from 'prop-types';

const asideGroup = ( props ) => {
    return (
        <Aux>
            <div className="Aside__heading">{ props.title }</div>
            { props.children }
        </Aux>
    );
};

asideGroup.propTypes = {
    title  : PropTypes.string,
};

export default asideGroup;
