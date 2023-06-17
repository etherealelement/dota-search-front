import './User.css';
import React from "react";

export class UserProps {
    login: string = '';
    Link: string = '';
    MMR: string = '';
    PossiblePos: any;
    itemType: string = '';
    onToggleDone: any;
}


const User = (props: UserProps) => {
    const {login, Link, MMR, PossiblePos, itemType} = props;
    const extractKeys = (obj: { [x: string]: unknown; }) => JSON.stringify(Object.keys(obj)
        .filter(key => obj[key]))
        .replace('[', '')
        .replace(']', '');

    return (
        <div className="row">
            <div className="col border border-info border-opacity-25">
            <span
                className={'list-item-label'}>
                {itemType}: {login}
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
