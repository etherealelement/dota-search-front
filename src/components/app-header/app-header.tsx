import './app-header.css';
import FilterPanel from "../filter-panel";
import {FIXMELATER} from "../../shared/Constants";
import { Stack } from '@mui/material';

export class AppHeaderProps{
    itemType:string = 'command'
    onPositionChange:FIXMELATER
    onMMRChange:FIXMELATER
    players: string = '0'
    commands: string = '0'
    messages: string = '0'
}

const AppHeader = (props: AppHeaderProps) => {
    const {itemType, onMMRChange,onPositionChange,players, commands, messages} = props;
    const classname = itemType === 'message' ? itemType:'';
    // @ts-ignore
    return (
        // @ts-ignore
        <Stack direction={"row"} spacing={3} justifyContent={"space-between"}>
            <h2 className={classname}>Dota search</h2>
            <FilterPanel itemType={itemType} onMMRChange={onMMRChange} onPositionChange={onPositionChange}/>
            <h5 className='d-flex justify-content-end'>{messages} messages, {commands} commands, {players} players</h5>
        </Stack>
    );
};

export default AppHeader;
