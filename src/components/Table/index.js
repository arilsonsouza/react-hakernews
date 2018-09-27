import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Sort from '../Sort';
import './index.css';

const isSearched = (searchTerm) => (item) =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

const largeColumn = {
    width:  '40%'
};

const midColumn = {
    width:  '30%'
};

const smallColumn = {
    width:  '10%'
};

const Table = ({ list, sortKey, onSort, SORTS, isSortReverse, onDismiss }) => {
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
    return (
        <div className="table">
            <div className="table-header">
                <span style={{ width: '40%' }}>
                    <Sort 
                        sortKey={'TITLE'}
                        onSort={onSort}    
                        activeSortKey={sortKey}
                    >
                        Titúlo
                    </Sort>
                </span>

                <span style={{ width: '30%' }}>
                    <Sort 
                        sortKey={'AUTHOR'}
                        onSort={onSort}
                        activeSortKey={sortKey}    
                    >
                        Autor
                    </Sort>
                </span>

                <span style={{ width: '10%' }}>
                    <Sort 
                        sortKey={'COMMENTS'}
                        onSort={onSort}
                        activeSortKey={sortKey}    
                    >
                        Comentários
                    </Sort>
                </span>

                <span style={{ width: '10%' }}>
                    <Sort 
                        sortKey={'POINTS'}
                        onSort={onSort}
                        activeSortKey={sortKey}    
                    >
                        Pontos
                    </Sort>
                </span>

                <span style={{ width: '10%' }}>
                    Arquivo
                </span>
            </div>
            {
                reverseSortedList.map((item => 
                    <div key={ item.objectID } className="table-row">
                        <span style={ largeColumn }>
                            <a href={ item.url }>{ item.title }</a>
                        </span>
                        <span style={ midColumn }>
                            { item.author }
                        </span>
                        <span style={ smallColumn }>
                            { item.num_comments }
                        </span>
                        <span style={ smallColumn }>
                            { item.points }
                        </span>
                        <span style={ smallColumn }>
                            <Button onClick={() => onDismiss(item.objectID)}
                                className="button-inline"
                            >
                                Dispensar
                            </Button>
                        </span>
                    </div>
                ))
            }
        </div>
    );
};
Table.propTypes = {
    list: PropTypes.array.isRequired,
    onDismiss: PropTypes.func.isRequired
};

export default Table;