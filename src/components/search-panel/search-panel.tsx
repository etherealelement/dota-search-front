import './search-panel.css';
import {FIXMELATER} from "../../shared/Constants";

const SearchPanel = (props: FIXMELATER) => {
    const {onChangeSearch, search} = props;
    return (
        <input type="text"
               className="form-control search-input input-group-text"
               placeholder="Type to search"
               onChange={onChangeSearch}
               value={search}
        />
    );
};

export default SearchPanel;
