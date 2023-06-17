import React, { Component } from 'react';

import './list-item.css';
import User from "./user/User";

export default class ListItem extends Component {

  render() {
  //   const {  selected } = this.props;
    // let classNames = 'list-item';
    // if (selected) classNames += ' selected';
    const ItemFromType = ({itemType}) =>{
      switch (itemType){
        case 'player':
          console.log("Rendering player");
          return new User({...this.props});
        // case 'command':
        //   return new Command({...this.props});
      }
      console.log("Unknown item type: ", itemType);
      return(
          <div className="row-cols-sm-1">
            <div className="col">
              <span className="list-item-label float-lg-start">
                {this.props.label}
              </span>
            </div>
            <div className="col float-right">
                <div className="row float-lg-end">
                    <a href={this.props.Link} className="float-lg-end link-success">
                        {this.props.Link}
                    </a>
                    <time className="time" dateTime={new Date(this.props.Timestamp).toISOString()}>{new Date(this.props.Timestamp).toLocaleString()}</time>
                </div>
            </div>
          </div>
      );
    };
    console.log("item has:", this.props);
    return (
      <div className="container-fluid list-item">
        <div className="row">
          < ItemFromType {...this.props}/>
        </div>
      </div>
    );
  };
}

