import "./filter-panel.css"
import {POSITIONS, Positions} from "../../shared";
import {CheckboxInput3} from "../common/inputs";
import {CheckBoxKeys, FIXMELATER} from "../../shared/Constants";
import {useCallback, useState} from "react";
import * as React from 'react';
import {FormGroup, Slider} from '@mui/material';

const initialFilterPositions = ()=>{
    const p = new Positions();
    Object.keys(p).forEach(k=>{
        // @ts-ignore
        p[k] = false;
    });
    return p;
}
// @ts-ignore
export const FilterPanel = ({itemType, onPositionChange, onMMRChange})=> {
    const [positions, setPositions] = useState(new Positions());
    const [mmr, setMMR] = React.useState<number[]>([0, 12000]);
    const onChange = useCallback((e:FIXMELATER)=>{
        if (e.target.type && e.target.type ==="checkbox"){
            const newState={...positions, [e.target.name]: e.target.checked};
            setPositions(newState);
            const filter = {positions:{...newState}}
            Object.entries(filter.positions).forEach(([k,v])=>{
                // @ts-ignore
                filter.positions[k] = v;
            })
            onPositionChange(filter);
            return;
        }
        setMMR(e.target.value);
        onMMRChange({MMR: e.target.value});
    },[positions,setPositions, mmr,setMMR]);

    if (itemType==='message') { // @ts-ignore
        return <div/>
    }
    // @ts-ignore
    const checkboxes = POSITIONS.map(el => <CheckboxInput3 name={el} value={positions[el]} onChange={onChange} childrn={el} key={CheckBoxKeys[el]}/>);
    const valuetext = (e: any)=>(e+"pts").toString();
    return (    // @ts-ignore
    <form className="filter-panel">
        <Slider
            getAriaLabel={() => 'Temperature range'}
            value={mmr}
            onChange={onChange}
            valueLabelDisplay="on"
            getAriaValueText={valuetext}
            min={0}
            max={12000}
            sx={{
            '& .MuiSlider-thumb': {
                color: "#361783"
            },
            '& .MuiSlider-track': {
                color: "#2f1144"
            },
            '& .MuiSlider-rail': {
                color: "#42345b"
            },
            '& .MuiSlider-active': {
                color: "#ac33e3"
            }
        }}
        />
        <FormGroup className="justify-content-evenly"  row>
            {checkboxes}
        </FormGroup>
    </form>
    );
}