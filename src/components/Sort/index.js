import React from 'react';
import Button from '../Button';
import classNames from 'classnames';
import ArrowUp from '../ArrowUp';
import ArrowDown from '../ArrowDown';

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
    const sortClass = classNames(
        'button-inline',
        { 'button-active': sortKey === activeSortKey }
    );
    
    const arrow = sortKey === activeSortKey ?  <ArrowUp>{children}</ArrowUp> : <ArrowDown>{children}</ArrowDown>;

    return (
        <Button 
            onClick={()=> onSort(sortKey)} 
            className={ sortClass }>
            {arrow}
            
        </Button>
    );
};

export default Sort;