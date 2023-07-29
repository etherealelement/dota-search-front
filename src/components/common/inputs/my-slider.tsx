import {Slider} from "@mui/material";
import * as React from "react";
import {FIXMELATER} from "../../../shared/Constants";


// onChange: (e: { target: { type: string; name: any; checked: any; value: ((prevState: number[]) => number[]) | number[] } }) => void
export function MySlider(props: { ariaLabel: () => string, value: number[], onChange: FIXMELATER, ariaValueText: (e: any) => string }) {
    return <Slider
        getAriaLabel={props.ariaLabel}
        value={props.value}
        onChange={props.onChange}
        valueLabelDisplay="on"
        getAriaValueText={props.ariaValueText}
        min={0}
        max={12000}
        sx={{
            "& .MuiSlider-thumb": {
                color: "#361783"
            },
            "& .MuiSlider-track": {
                color: "#2f1144"
            },
            "& .MuiSlider-rail": {
                color: "#42345b"
            },
            "& .MuiSlider-active": {
                color: "#ac33e3"
            }
        }}
    />;
}