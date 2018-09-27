import React from 'react';
import './search.css';

const Search = ({ value, onChange,onSubmit ,children }) => {
    return(
        <form onSubmit={ onSubmit }>
            <input 
                id="search"
                type="text"
                value={ value }
                onChange={ onChange }  
            />
            <button type="submit">
                { children }
            </button>
        </form>
    );
}

export default Search;