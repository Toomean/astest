
import React from 'react';
import './Aside.scss';

import CurrencySwitch from './CurrencySwitch/CurrencySwitch';

const aside = () => {
    return (
        <aside className="Aside">
            <div className="Aside__heading">Валюта</div>
            <CurrencySwitch />
            <div className="Aside__heading">Количество пересадок</div>
        </aside>
    );
};

export default aside;
