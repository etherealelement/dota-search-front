import {useState} from 'react';
import {getId, ItemType, POSITIONS, Positions} from '../../../shared';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'; // no
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'; // hard support
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'; // soft support
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'; // offlane
import Woman2Icon from '@mui/icons-material/Woman2'; // midlane
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts'; // carry
import {FIXMELATER} from "../../../shared/Constants";
import {Checkbox, FormControlLabel} from "@mui/material";
import * as React from "react";

export const CheckboxInput = (props: FIXMELATER) => {
    const [id] = useState(getId('checkbox_'));
    return (
        // @ts-ignore
        <div className="checkbox-wrapper-10 flex-row">
            <input className="tgl tgl-flip" type="checkbox" id={id} key={id} checked={props.value}
                   onChange={props.onChange}
                   name={props.name} {...props}/>
            <label className="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" htmlFor={id}/>
            <span className="list-item"> {props.childrn} </span>
        </div>
    );
};

export const CheckboxInput2 = (props: FIXMELATER) => {
    const [id] = useState(getId('checkbox2_'));
    return (
        // @ts-ignore
        <div className="checkbox-wrapper-2">
            <input className="plus-minus" type="checkbox" id={id} key={id} checked={props.value}
                   onChange={props.onChange}
                   name={props.name} {...props}/>
            {/*{props.childrn}*/}
            {/*<label className="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" htmlFor={id}/>*/}
            <span className="list-item"> {props.childrn} </span>
        </div>
    );
};

const PosToIcon = {
    HardSupport: <BabyChangingStationIcon/>,
    SoftSupport: <SelfImprovementIcon/>,
    Offlane: <AccessibleForwardIcon/>,
    Midlane: <Woman2Icon/>,
    Carry: <SportsMartialArtsIcon/>,
};

export const CheckboxInput3 = (props: FIXMELATER) => {
    const [key] = useState(getId('checkbox3_'));
    return (
        // @ts-ignore
        <FormControlLabel onChange={props.onChange} name={props.name} key={key}  control={<Checkbox defaultChecked icon={<DoNotDisturbAltIcon/>} checkedIcon={PosToIcon[props.name]} />} label={props.childrn} />
    );
};