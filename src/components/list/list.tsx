import ListItem from '../list-item';
import './list.css';
import Loader from '../common/loader';
import {FIXMELATER} from "../../shared/Constants";

const List = (props: FIXMELATER) => {
    const {items, loaded} = props;
    if (!loaded) return <Loader/>;
    const elements = items.map((item: FIXMELATER) => {
        const {id, ...itemProps} = item;
        return (
            <li key={id} className="list-group-item">
                <ListItem
                    {...itemProps}
                />
            </li>
        );
    });

    return (
        <ul className="list-group list">
            {elements}
        </ul>
    );
};

export default List;
