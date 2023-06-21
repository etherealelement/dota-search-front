import ListItem from '../list-item';
import './list.css';
import Loader from '../common/loader';
import {FIXMELATER} from "../../shared/Constants";


const List = (props: FIXMELATER) => {
    const {items, loaded} = props;
    // @ts-ignore
    if (!loaded ) return <Loader/>;

    const elements = items.map((item: FIXMELATER) => {
        const {key, ...itemProps} = item;
        return (
            <li key={key} className="list-group-item">
                <ListItem
                    {...itemProps}
                />
            </li>
        );
    });

    return (
        // @ts-ignore
        <ul className="list-group list">
            {elements}
        </ul>
    );
};

export default List;
