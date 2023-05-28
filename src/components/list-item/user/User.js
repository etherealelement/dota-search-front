import React, { Component } from 'react';

import './User.css';

export default class User extends Component{
    render(){
        const {label, Link, MMR, PossiblePos, itemType, onToggleDone} = this.props;
        console.log("user has:", this.props);
        return(
            <div className="row">
                <div className="col border border-info border-opacity-25">
                <span
                    className={"list-item-label"}
                    onClick={ onToggleDone }>
                    {itemType}: {label}
                </span>
                </div>
                <div className="col-2 border border-info border-opacity-25">
                    Pos: {PossiblePos.filter((el)=>{return el !==0;})}
                </div>
                <div className="col-3 border border-info border-opacity-25">
                    MMR: {MMR}
                </div>
                <div className="col float-lg-end border border-info border-opacity-25">
                    <a href={Link} className="float-lg-end">
                        {Link}
                    </a>
                </div>
            </div>
        );
    }
}