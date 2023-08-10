import './item-status-filter.css';
import {getId} from '../../shared';
import {FIXMELATER} from "../../shared/Constants";
import React from 'react';

const Button = (props: { filter: string; label: string; onClick: (p:{itemType:string}) => void; }) => {
    const {filter, label, onClick} = props;
    let lower = label.toLowerCase();
    if (lower !== 'all') lower = lower.slice(0, -1);
    const className = filter === lower ? 'btn-grad' : 'btn-outline-secondary';
    return (
        // @ts-ignore
        <button type="button"
                className={`btn ${className}`}
                onClick={() => {
                    onClick({itemType: lower});
                }}>
            {label}
        </button>
    );
};

const ItemStatusFilter = (props: { onChangeFilter: FIXMELATER; filter: FIXMELATER; }) => {
    const {onChangeFilter, filter} = props;
    const buttons = ['Messages', 'Commands', 'Players'].map(el => {
        const id = getId('filter_');
        return (<Button filter={filter} label={el} onClick={onChangeFilter} key={id}/>);
    });
    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
};

export default ItemStatusFilter;
