import React,{ Component } from 'react';
import './index.css';

class Search extends Component {

    componentDidMount(){
        this.input.focus();
    }
    render(){
        const  { value, onChange,onSubmit ,children } = this.props;
        return(
            <form onSubmit={ onSubmit }>
                <input 
                    id="search"
                    type="text"
                    value={ value }
                    onChange={ onChange }
                    ref={ (node) => { this.input = node; } }  
                />
                <button type="submit">
                    { children }
                </button>
            </form>
        );
    }
}

export default Search;