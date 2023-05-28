import React, {Component} from 'react';

import ListItem from '../list-item';
import './list.css';
import Loader from "../common/loader";

export default class List extends Component {
  render() {
    const {items, loading} = this.props;
    if (loading) return <Loader/>;
    const elements = items.map((item) => {
      const {id, ...itemProps} = item;
      console.log("Rendering item type: ", item.itemType);
      return (
          <li key={id} className="list-group-item">
            <ListItem
                {...itemProps}
                onToggleDone={() => {
                  onSelectItem(id)
                }}
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
}
// export default List;
