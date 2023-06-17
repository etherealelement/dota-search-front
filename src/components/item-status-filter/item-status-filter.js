import React, { Component } from 'react';

import './item-status-filter.css';

const Button = ({filter, label, onClick}) =>{
    let lower = label.toLowerCase();
    if (lower !== 'all') lower = lower.slice(0,-1);

    const className = filter===lower ? "btn-info" : "btn-outline-secondary";
    return(
    <button type="button"
            className={`btn ${className}`}
            onClick={()=>{onClick(lower)}}>
        {label}
    </button>
    );
};


export default class ItemStatusFilter extends Component {
  render() {
      const {onChangeFilter, filter} = this.props;
        return (
          <div className="btn-group">
              <Button filter={filter} label="Messages" onClick={onChangeFilter}/>
              <Button filter={filter} label="Commands" onClick={onChangeFilter}/>
              <Button filter={filter} label="Players" onClick={onChangeFilter}/>
          </div>
        );
      };
}
