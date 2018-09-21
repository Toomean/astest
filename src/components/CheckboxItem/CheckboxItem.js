
import React from 'react';
import PropTypes from 'prop-types';
import './CheckboxItem.scss';

const checkboxItem = ( props ) => {

    const onlyButton = props.cantBeCheckedOnly
        ? null
        : <div className="CheckboxItem__only"
            onClick={ props.changedOnly } >
            <span className="Checkbox__only-content">Только</span>
        </div>;

    return (
        <div className="CheckboxItem">
            <label className="CheckboxItem__label">
                <div className="CheckboxItem__input">
                    <input
                        type="checkbox"
                        hidden
                        onChange={ props.changed }
                        checked={ props.checked } />

                    <div className="CheckboxItem__appearance"></div>
                </div>
                { props.title }
            </label>
            { onlyButton }
        </div>
    );
};

checkboxItem.propTypes = {
    cantBeCheckedOnly : PropTypes.bool,
    changedOnly       : PropTypes.func,
    changed           : PropTypes.func,
    checked           : PropTypes.bool,
    title             : PropTypes.string,
};

export default checkboxItem;
