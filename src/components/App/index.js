import React, { Component } from 'react';
import Loading from '../Loading';
import { sortBy } from 'lodash';
import Button from '../Button';
import Search from '../Search';
import Table from '../Table';
import './index.css';

import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,
  
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from '../../constants';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading ? <Loading/> : <Component {...rest}/>

const ButtonWithLoading = withLoading(Button);

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false,
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
      },
      isLoading: false 
    });
  }

  needsToSearchTopstories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopstories =(searchTerm, page) => {
    this.setState({ isLoading: true });

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

  onSort = (sortKey) => {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({ sortKey, isSortReverse })
  };

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
    const { searchTerm, results, searchKey, isLoading, sortKey, isSortReverse } = this.state;
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
            sortKey={ sortKey }
            isSortReverse={ isSortReverse }
            onSort={ this.onSort }
            SORTS={SORTS}
            onDismiss={ this.onDismiss }
          />
          

        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={ () => this.fetchSearchTopstories(searchTerm, page+1) }
          >
            Mais
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
