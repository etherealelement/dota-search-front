import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component{

  render() {
    const {onChangeSearch, search} = this.props;
    return (
      <input type="text"
                className="form-control search-input input-group-text"
                placeholder="Type to search"
                onChange={onChangeSearch}
                value={search}
      />
    );
  }
};

