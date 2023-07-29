import {POSITIONS, Positions} from "../../shared";
import * as React from "react";
import {useCallback, useState} from "react";
import {FormGroup} from '@mui/material';
import {CheckboxesFromPositions, CheckboxesFromPositionsNoText} from "../common/inputs/checkbox";
import {MySlider} from "../common/inputs/my-slider";

function FilterOnChangeCallback(positions: Positions, setPositions: (value: (((prevState: Positions) => Positions) | Positions)) => void, onPositionChange: (arg0: { positions: { HardSupport: boolean; SoftSupport: boolean; Offlane: boolean; Midlane: boolean; Carry: boolean; }; }) => void, setMMR: (value: (((prevState: number[]) => number[]) | number[])) => void, onMMRChange: (arg0: { MMR: any; }) => void) {
    return (e: { target: { type: string; name: any; checked: any; value: ((prevState: number[]) => number[]) | number[]; }; }) => {
        if (e.target.type && e.target.type === "checkbox") {
            const newState = {...positions, [e.target.name]: e.target.checked};
            setPositions(newState);
            const filter = {positions: {...newState}}
            Object.entries(filter.positions).forEach(([k, v]) => {
                // @ts-ignore
                filter.positions[k] = v;
            })
            onPositionChange(filter);
            return;
        }
        setMMR(e.target.value);
        onMMRChange({MMR: e.target.value});
    };
}

// @ts-ignore
export const FilterPanel = ({itemType, onPositionChange, onMMRChange})=> {
    const [positions, setPositions] = useState(new Positions());
    const [mmr, setMMR] = React.useState<number[]>([0, 12000]);
    const onChange = useCallback(
        FilterOnChangeCallback(positions, setPositions, onPositionChange, setMMR, onMMRChange),
        [positions,setPositions, mmr,setMMR]);

    if (itemType==='message') { // @ts-ignore
        return <div/>
    }
    const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
    // @ts-ignore
    const checkboxes = POSITIONS.map(CheckboxesFromPositions(positions, onChange));
    // @ts-ignore
    const androidCheckboxes = POSITIONS.map(CheckboxesFromPositionsNoText(positions, onChange));
    const valuetext = (e: any)=>(e+"pts").toString();
    return (    // @ts-ignore
    <form>
        <MySlider ariaLabel={() => 'Temperature range'} value={mmr} onChange={onChange} ariaValueText={valuetext}/>
        <FormGroup row>
            {isAndroid ? androidCheckboxes : checkboxes}
        </FormGroup>
    </form>
    );
}