import './CommandCard.css';
import {Positions} from "../../../shared";
import {toPositions} from "../../common/icons/positions";
import {Stack} from "@mui/material";


export class CommandCardProps {
    Data: string = '';
    Link: string = '';
    MMR: string = '';
    PossiblePos: Positions = new Positions();
    itemType: string = '';
    key: string = '';
}

const CommandCard = (props: CommandCardProps) => {
    const {Data, Link, MMR, PossiblePos, itemType} = props;

    return (    // @ts-ignore
        <Stack direction="row" className="row container-fluid list-item list-group-item">
            <div className="col ">
            <span
                className={'list-item-label'}>
                {Data}
            </span>
            </div>
            <div className="col-2 player-positions">
                Pos: {toPositions(PossiblePos)}
            </div>
            <div className="col-3 ">
                MMR: {MMR}
            </div>
            <div className="col float-lg-end ">
                <a href={Link} className="link-success float-lg-end">
                    {Link}
                </a>
            </div>
        </Stack>
        // <div className="row container-fluid list-item list-group-item">
        //     <div className="col border border-info border-opacity-25">
        //     <span
        //         className={'list-item-label'}>
        //         {Data}
        //     </span>
        //     </div>
        //     <div className="col-2 border border-info border-opacity-25 player-positions">
        //         Pos: {toPositions(PossiblePos)}
        //     </div>
        //     <div className="col-3 border border-info border-opacity-25">
        //         MMR: {MMR}
        //     </div>
        //     <div className="col float-lg-end border border-info border-opacity-25">
        //         <a href={Link} className="link-success float-lg-end">
        //             {Link}
        //         </a>
        //     </div>
        // </div>
    );
};

export default CommandCard;
