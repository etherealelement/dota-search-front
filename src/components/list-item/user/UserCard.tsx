import './User.css';
import {Positions} from "../../../shared";


export class UserProps {
    Login: string = '';
    Link: string = '';
    MMR: string = '';
    PossiblePos: Positions = new Positions();
    itemType: string = '';
    playerPositions: string[] = [];
}


const UserCard = (props: UserProps) => {
    const {Login, Link, MMR, playerPositions, itemType} = props;

    return (    // @ts-ignore
        <div className="row">
            <div className="col border border-info border-opacity-25">
            <span
                className={'list-item-label'}>
                {itemType}: {Login}
            </span>
            </div>
            <div className="col-2 border border-info border-opacity-25 player-positions">
                Pos: {playerPositions}
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
