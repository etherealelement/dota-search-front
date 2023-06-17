import './item-status-filter.css';
import {getId} from '../../shared';


// @ts-ignore
const Button = ({filter, label, onClick}) => {
    let lower = label.toLowerCase();
    if (lower !== 'all') lower = lower.slice(0, -1);

    const className = filter === lower ? 'btn-grad' : 'btn-outline-secondary';
    return (
        <button type="button"
                className={`btn ${className}`}
                onClick={() => {
                    onClick({itemType: lower});
                }}>
            {label}
        </button>
    );
};

const ItemStatusFilter = (props: { onChangeFilter: any; filter: any; }) => {
    const {onChangeFilter, filter} = props;
    const buttons = ['Messages', 'Commands', 'Players'].map(el => {
        const id = getId('filter_');
        return (<Button filter={filter} label={el} onClick={onChangeFilter} id={id} key={id}/>);
    });
    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
};

export default ItemStatusFilter;
