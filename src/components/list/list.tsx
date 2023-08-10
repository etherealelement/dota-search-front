import ListItem from '../list-item';
import './list.css';
import {FIXMELATER} from "../../shared/Constants";
// @ts-ignore
import {Grid} from "@mui/material";
import React from 'react';


const List = (props: FIXMELATER) => {
    const {items, loaded} = props;
    if (!loaded ) return;

    // @ts-ignore
    const elements = items.sort(({Timestamp}, b) => {
        if (Timestamp !== b.Timestamp) {
            if (Timestamp < b.Timestamp)
                return 1;
            return -1;
        }
        return 0;
    }).map((item: FIXMELATER) => {
        const {key, ...itemProps} = item;
        return (
            <Grid item className="list-group-item">
                <ListItem
                    {...itemProps}
                />
            </Grid>
            // <li key={key} className="list-group-item">
            //     <ListItem
            //         {...itemProps}
            //     />
            // </li>
        );
    });

    return (
        // @ts-ignore
    <Grid container alignItems="stretch" direction="column" className="list">
        {elements}
    </Grid>
    // <Grid container alignItems="stretch" className="list-group list" divider={<Divider orientation="horizontal" flexItem />}>
    //     {elements}
    // </Grid>
        // <Stack className="list-group list" divider={<Divider orientation="horizontal" flexItem />}>
        //     {elements}
        // </Stack>
    );
};

export default List;
