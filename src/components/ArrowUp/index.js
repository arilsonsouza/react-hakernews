import React from 'react';

const ArrowUp = ({children}) => {
    return (
        <span>{children} 
            <span style={{ marginLeft: '.2rem',verticalAlign: '-webkit-baseline-middle',  verticalAlign: '-webkit-baseline-middle'}}>
                <svg width="10" aria-hidden="true" data-prefix="fas" data-icon="sort-up" className="svg-inline--fa fa-sort-up fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path fill="currentColor" d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
                </svg>  
            </span>
        </span>
    )
};

export default ArrowUp;