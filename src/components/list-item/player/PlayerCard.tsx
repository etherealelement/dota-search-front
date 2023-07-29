import './player.css';
import {Positions} from "../../../shared";
import {toPositions} from "../../common/icons/positions";
import {Card, Link, Stack} from "@mui/material";


export class PlayerProps {
    Data: string = '';
    Link: string = '';
    MMR: string = '';
    PossiblePos: Positions = new Positions();
    itemType: string = '';
    key: string = '';
}

const PlayerCard = (props: PlayerProps) => {
    const {Data, MMR, PossiblePos, itemType} = props;
    const link = props.Link;
    return (    // @ts-ignore

        <Stack direction={"row"} justifyContent={"center"} className="row container-fluid list-group-item" >
            <div className="col">
            <span
                className={'list-item-label'}>
                {Data}
            </span>
        </div>
            <div className="col-2  player-positions">
                Pos: {toPositions(PossiblePos)}
            </div>
            <div className="col-3 ">
                MMR: {MMR}
            </div>
            <div className="col float-lg-end ">
                <a href={link} className="link-success float-lg-end">
                    {link}
                </a>
            </div>
            {/*<Card children={Data}/>*/}
            {/*<Card children={toPositions(PossiblePos)}/>*/}
            {/*<Card children={"MMR:" + MMR}/>*/}
            {/*<Link href={link}> {link} </Link>*/}
        </Stack>
        // <div className="row container-fluid list-item">
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

export default PlayerCard;
