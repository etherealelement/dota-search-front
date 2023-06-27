import {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import List from '../list';
import ItemStatusFilter from '../item-status-filter';
import ItemAdd from '../item-add';
import './app.css';
import DotaSearchService from '../../services/DotaSearchService';
import {ItemType, getId, Player, Positions} from '../../shared';
import {cloneDeep} from 'lodash';
import {FIXMELATER, HttpStatusCode} from "../../shared/Constants";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {TypeText} from "@mui/material/styles/createPalette";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
},
);

class Filter {
    itemType: string = ItemType.MESSAGE
    positions: Positions = new Positions()
    MMR: number[] = [0,12000]
}


export default class App extends Component {
    state = {
        [ItemType.MESSAGE]: [],
        [ItemType.PLAYER]: [],
        [ItemType.COMMAND]: [],
        filter: new Filter(),
        term: '',
        loaded: {},
    };
    api = new DotaSearchService();

    constructor(props : {}) {
        super(props);
        this.updateMessages();
    }

    FromMessage = (v:FIXMELATER) => {
        const id = getId('message_');
        return {
            itemType: ItemType.MESSAGE,
            key: id,
            id,
            ...v,
        };
    };

    onMessagesLoaded = (msgs: FIXMELATER[]) => {
        this.setState({
            message: [
                ...msgs.map(this.FromMessage).filter(el =>
                    // no empty, null, or undefined messages
                    (el.Data?.length),
                ),
            ],
            loaded: {...this.state.loaded, [ItemType.MESSAGE]: true},
        });
    };

    onPlayersLoaded = (players: FIXMELATER[]) => {
        const converted = players.map(el => {
            const id = getId('player_');
            el.itemType = ItemType.PLAYER;
            el.key = id;
            el.id = id;
            return el;
        });
        this.setState({
            player: [
                ...converted,
            ],
            loaded: {...this.state.loaded, [ItemType.PLAYER]: true},
        });
    };

    onCommandsLoaded = (commands: FIXMELATER[]) => {
        const converted = commands.map(el => {
            const id = getId('command_');
            el.itemType = ItemType.COMMAND;
            el.key = id;
            el.id = id;
            return el;
        });
        this.setState({
            command: [
                ...converted,
            ],
            loaded: {...this.state.loaded, [ItemType.COMMAND]: true},
        });
    };


    updateMessages = () => {
        this.api.getAllMessages(false)
            .then(this.onMessagesLoaded);
    };

    updateCommands = () => {
        this.api.getAllCommands()
            .then(this.onCommandsLoaded);
    };

    updatePlayers = () => {
        this.api.getAllPlayers()
            .then(this.onPlayersLoaded);
    };

    FilterChangeCallbacks = {
        [ItemType.MESSAGE]: this.updateMessages,
        [ItemType.COMMAND]: this.updateCommands,
        [ItemType.PLAYER]: this.updatePlayers,
    };

    addPlayer = (_player: Player) => {
        const {player} = this.state;
        const p = cloneDeep(_player);
        this.api.postPlayer(p).then((r) => {
            if (r.status === HttpStatusCode.OK) { // updated
                this.updatePlayers();
                return;
            }
            if (player) {
                this.setState({
                    player: [
                        // @ts-ignore
                        ...player,
                        _player,
                    ],
                });
            } else {
                this.setState({
                    [ItemType.PLAYER]: [_player],
                });
            }
        });
    };
    addCommand = (_command: Player) => {
        const {command} = this.state;
        const p = cloneDeep(_command);
        this.api.postCommand(p).then((r) => {
            if (r.status === HttpStatusCode.OK) { // updated
                this.updateCommands();
                return;
            }
            if (command) {
                this.setState({
                    command: [
                        // @ts-ignore
                        ...command,
                        _command,
                    ],
                });
            } else {
                this.setState({
                    [ItemType.COMMAND]: [_command],
                });
            }
        });
    };

    changeFilter = (filter: Filter) => {
        const {loaded} = this.state;
        // @ts-ignore
        if (!loaded[filter.itemType])
            this.FilterChangeCallbacks[filter.itemType]();
        this.setState({filter: filter});
    };

    changeFilterPart = (filter: Filter) =>{
        const updatedState= {...this.state.filter, ...filter}
        this.changeFilter(updatedState);
    }

    filterBySearch = (arr: FIXMELATER, term: FIXMELATER) => {
        if (term.trim() === '') return arr;
        switch (this.state.filter.itemType) {
            case "player":
            case "command":
                // @ts-ignore
                return arr.filter(({Login}) => {
                    const lowerLabel = Login.toLowerCase();
                    return lowerLabel.indexOf(term.toLowerCase()) > -1;});

            case "message":
                // @ts-ignore
                return arr.filter(({Data}) => {
                    const lowerLabel = Data.toLowerCase();
                    return lowerLabel.indexOf(term.toLowerCase()) > -1;
                });
        }
    };

    filterByState = () => {
        const {itemType, positions} = this.state.filter;
        let items = this.state[itemType];
        if ([ItemType.PLAYER, ItemType.COMMAND].includes(itemType)) {
            // @ts-ignore
            items = items.filter((p:Player)=>{
                // const {} = this.state.filter;
                // console.log(positions);
                // console.log(p.PossiblePos);
                    // @ts-ignore
                    return Object.entries(p.PossiblePos).some(([k,v])=>{
                        // @ts-ignore
                        // console.log("user pos is ", k, "user val is ", v, " and filter value is ", positions[k]);
                        // @ts-ignore
                        return positions[k] &&  positions[k] === v;
                    });
                })
                .filter((p:Player)=>{
                    const pts = +p.MMR;
                    const {MMR} = this.state.filter;
                    // console.log("pts ", pts, "is more than", MMR[0]);
                    return pts > MMR[0];
                })
                .filter((p:Player)=>{
                    const pts = +p.MMR;
                    const {MMR} = this.state.filter;
                    // console.log("pts ", pts, "is less than", MMR[1]);
                    return pts < MMR[1];
                })

        }
        return items;
    };

    changeSearch = (e: { preventDefault: () => void; target: { value: any; }; }) => {
        e.preventDefault();
        this.setState({term: e.target.value});
    };

    render() {
        const {term, filter, message, player, command, loaded} = this.state;
        let searched = this.filterByState();
        searched = this.filterBySearch(searched, term);
        // @ts-ignore
        const status = loaded[filter.itemType];
        // @ts-ignore
        const players = player.length;
        // @ts-ignore
        const commands = command.length;
        // @ts-ignore
        const messages = message.length;
        return (
            // @ts-ignore
            <main className="app">
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                <AppHeader players={players} commands={commands} messages={messages} itemType={filter.itemType} onMMRChange={this.changeFilterPart} onPositionChange={this.changeFilterPart}/>
                <div className="top-panel d-flex">
                    <SearchPanel onChangeSearch={this.changeSearch} term={term}/>
                    <ItemStatusFilter onChangeFilter={this.changeFilterPart} filter={filter.itemType}/>
                </div>
                <List
                    items={searched}
                    loaded={status}
                    itemType={filter.itemType}
                    term={term}
                />
                <ItemAdd onAddPlayer={this.addPlayer} itemType={filter.itemType} onAddCommand={this.addCommand}/>
                </ThemeProvider>
            </main>
        );
    }
}

