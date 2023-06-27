import {useState} from 'react';
import {getId} from '../../../shared';
import { Checkbox } from '@mui/joy';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'; // no
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'; // hard support
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'; // soft support
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup'; // offlane
import Woman2Icon from '@mui/icons-material/Woman2'; // midlane
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts'; // carry
import {FIXMELATER} from "../../../shared/Constants";
import {ThemeProvider} from "@mui/material/styles";
import {darkTheme} from "../../app/app";

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

export const CheckboxInput3 = (props: FIXMELATER) =>{
    // return <Checkbox uncheckedIcon={<DoNotDisturbAltIcon />} label="I have an icon when unchecked" />
    // @ts-ignore
    darkTheme.vars = {fontSize:14, fontFamily:{body:'default'}};
    return(
    <ThemeProvider theme={darkTheme}>
        <Checkbox />
    </ThemeProvider>
    );
}