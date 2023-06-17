import React from 'react';

import ListItem from '../list-item';
import './list.css';

const List = ({ items, onSelectItem}) => {

  const elements = items.map((item) => {
    const { id, ...itemProps } = item;
    console.log("Rendering item type: ", item.itemType);
    return (
      <li key={id} className="list-group-item">
        <ListItem
            {...itemProps }
            onToggleDone ={() => {onSelectItem(id)}}
        />
      </li>
    );
  });

  return (
    <ul className="list-group list">
      { elements }
    </ul>
  );
};

export default List;
