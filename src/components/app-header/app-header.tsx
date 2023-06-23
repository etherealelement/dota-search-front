import './app-header.css';
import FilterPanel from "../filter-panel";
import {FIXMELATER} from "../../shared/Constants";

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
        <div className="app-header d-flex justify-content-end">
            <h1 className={classname}>Dota search</h1>
            <FilterPanel itemType={itemType} onMMRChange={onMMRChange} onPositionChange={onPositionChange}/>
            <h2 className='d-flex'>{messages} messages, {commands} commands, {players} players</h2>
        </div>
    );
};

export default AppHeader;
