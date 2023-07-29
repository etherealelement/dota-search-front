import {FIXMELATER} from "../../../shared/Constants";
import {Player} from "../../../shared";
import {Stack} from "@mui/material";
import AppHeader from "../../app-header";
import SearchPanel from "../../search-panel";
import ItemStatusFilter from "../../item-status-filter";
import List from "../../list";
import ItemAdd from "../../item-add";
import {Filter} from "../../../shared/Types";

export function AppRoot(props: { player: any, command: any, message: any, filter: any, onMMRChange: (filter: Filter) => void, onChangeSearch: (e: { preventDefault: () => void; target: { value: FIXMELATER } }) => void, term: any, items: any, stated: any, onAddPlayer: (_player: Player) => void, onAddCommand: (_command: Player) => void }) {

    // @ts-ignore
    return <Stack padding={2}>
        <AppHeader players={props.player.length} commands={props.command.length} messages={props.message.length}
                   itemType={props.filter.itemType} onMMRChange={props.onMMRChange}
                   onPositionChange={props.onMMRChange}/>
        <div className="top-panel d-flex">
            <SearchPanel onChangeSearch={props.onChangeSearch} term={props.term}/>
            <ItemStatusFilter onChangeFilter={props.onMMRChange} filter={props.filter.itemType}/>
        </div>
        <List
            items={props.items}
            loaded={props.stated.length != 0}
            itemType={props.filter.itemType}
            term={props.term}
        />
        <ItemAdd onAddPlayer={props.onAddPlayer} itemType={props.filter.itemType} onAddCommand={props.onAddCommand}/>
    </Stack>;
}