import './User.css';
import {Positions} from "../../../shared";
import {MessageProps} from "../message/Message";


export class UserProps {
    Login: string = '';
    Link: string = '';
    MMR: string = '';
    PossiblePos: Positions = new Positions();
    itemType: string = '';
    playerPositions: string[] = [];
    key: string = '';
}

export const toPositions=(p:Positions)=>{
    return JSON.stringify(Object.entries(p)
        .filter(([a, b]) => b)
        .map(([a, b])=>a))
        .replace('[', '')
        .replace(']', '')
        .replaceAll('"', '')
        .replaceAll(',', ', ');
}


const UserCard = (props: UserProps) => {
    const {Login, Link, MMR, PossiblePos, itemType} = props;

    return (    // @ts-ignore
        <div className="row container-fluid list-item">
            <div className="col border border-info border-opacity-25">
            <span
                className={'list-item-label'}>
                {itemType}: {Login}
            </span>
            </div>
            <div className="col-2 border border-info border-opacity-25 player-positions">
                Pos: {toPositions(PossiblePos)}
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

export default UserCard;
