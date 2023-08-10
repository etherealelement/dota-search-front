// no
// @ts-ignore
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'; // hard support
// @ts-ignore
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'; // soft support
// @ts-ignore
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'; // offlane
// @ts-ignore
import Woman2Icon from '@mui/icons-material/Woman2'; // midlane
// @ts-ignore
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import * as React from "react";
import {Positions} from "../../../shared"; // carry

const PosToIcon = {
    HardSupport: <BabyChangingStationIcon/>,
    SoftSupport: <SelfImprovementIcon/>,
    Offlane: <AccessibleForwardIcon/>,
    Midlane: <Woman2Icon/>,
    Carry: <SportsMartialArtsIcon/>,
};

export const toPositions=(p:Positions)=>{
    // @ts-ignore
    return Object.entries(p).filter(([a, b]) => b).map(([a,b])=>PosToIcon[a]);
    // return JSON.stringify(Object.entries(p)
    //     .filter(([a, b]) => b)
    //     .map(([a, b])=>a))
    //     .replace('[', '')
    //     .replace(']', '')
    //     .replaceAll('"', '')
    //     .replaceAll(',', ', ');
}
export default PosToIcon;