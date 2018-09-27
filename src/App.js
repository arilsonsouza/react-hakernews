import React, { Component } from 'react';
import Search from './components/search';
import Table from './components/table';
import './App.css';
import Button from './components/button';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE ='page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    }
  }

  setSearchTopstories = (result) => {
    const { hits, page} = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({ 
      results: { 
        ...results,
        [searchKey]: { hits: updatedHits, page }
      } 
    });
  }

  needsToSearchTopstories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopstories =(searchTerm, page) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if(this.needsToSearchTopstories(searchTerm)){
      this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }

  componentDidMount(){
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
;    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({ 
      results: { 
        ...results, 
        [searchKey]: { hits:updatedHits, page } }
    });
  }
  
  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, results, searchKey } = this.state;
    const page = (results &&
                  results[searchKey] &&
                  results[searchKey].page) || 0;
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];
    return (
      <div className="page">

        <div className="interactions">
          <Search 
            value={ searchTerm }
            onChange={ this.onSearchChange }
            onSubmit={ this.onSearchSubmit }
          >
          Filtrar
          </Search>
        </div>

          <Table 
            list={ list }
            onDismiss={ this.onDismiss }
          />
          

        <div className="interactions">
          <Button onClick={ () => this.fetchSearchTopstories(searchTerm, page+1) }>
            Mais
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
