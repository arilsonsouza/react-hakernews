import React from 'react';
import './search.css';

const Search = ({ value, onChange, children }) => {
    return(
        <form>
            <label htmlFor="search">
                { children }
            </label>
            <input 
                id="search"
                type="text"
                value={ value }
                onChange={ onChange }  
            />
        </form>
    );
}

export default Search;