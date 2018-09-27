import React, { Component } from 'react';
import Search from './components/search';
import Table from './components/table';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }
  }

  setSearchTopstories = (result) => {
    this.setState({ result });
  }

  fetchSearchTopstories =(searchTerm) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  componentDidMount(){
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({ 
      result: { ...this.state.result, hits:updatedHits }
    });
  }
  
  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, result } = this.state;
    if(!result){ return null; }
    return (
      <div className="page">

        <div className="interactions">
          <Search 
            value={ searchTerm }
            onChange={ this.onSearchChange }
          >
          Filtrar
          </Search>
        </div>
        <Table 
          list={ result.hits }
          pattern={ searchTerm }
          onDismiss={ this.onDismiss }
        />
      </div>
    );
  }
}

export default App;
