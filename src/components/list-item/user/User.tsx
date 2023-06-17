import './User.css';
import React from "react";
import {Positions} from "../../../shared";

export class UserProps {
    Login: string = '';
    Link: string = '';
    MMR: string = '';
    PossiblePos: Positions = new Positions();
    itemType: string = '';
    onToggleDone: any;
}


const User = (props: UserProps) => {
    const {Login, Link, MMR, PossiblePos, itemType} = props;
    const extractKeys = (obj: Positions) => JSON.stringify(Object.entries(obj)
        .filter(([a, b]) => b)
        .map(([a,b])=>a))
        .replace('[', '')
        .replace(']', '');

    return (    // @ts-ignore
        <div className="row">
            <div className="col border border-info border-opacity-25">
            <span
                className={'list-item-label'}>
                {itemType}: {Login}
            </span>
            </div>
            <div className="col-2 border border-info border-opacity-25">
                Pos: {extractKeys(PossiblePos)}
            </div>
            <div className="col-3 border border-info border-opacity-25">
                MMR: {MMR}
            </div>
            <div className="col float-lg-end border border-info border-opacity-25">
                <a href={Link} className="link-success float-lg-end">
                    {Link}
                </a>
            </div>
        </div>
    );
};

export default User;
