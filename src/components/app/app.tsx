import {Component} from 'react';
import './app.css';
import DotaSearchService from '../../services/DotaSearchService';
import {getId, ItemType, Player} from '../../shared';
import {FIXMELATER} from "../../shared/Constants";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {darkTheme} from "../common/app/theme";
import {AppRoot} from "../common/Root/appRoot";
import {Filter} from "../../shared/Types";

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
    wsMsgs: FIXMELATER = [];
    wsPlayers: FIXMELATER = [];
    wsCommands: FIXMELATER = [];

    processWsMessage =(v: FIXMELATER)=>{
        v.key = getId(v.itemType);
        switch (v.itemType) {
        case ItemType.MESSAGE:
            this.wsMsgs.push(v);
            this.setState({
                [ItemType.MESSAGE]: [
                    // @ts-ignore
                    ...this.state[ItemType.MESSAGE],
                    ...this.wsMsgs,
                ]
            });
            break;
        case ItemType.PLAYER:
                this.wsPlayers.push(v);
                this.setState({
                    [ItemType.PLAYER]: [
                        // @ts-ignore
                        ...this.state[ItemType.PLAYER].filter((pp: Player) => {
                            // console.log(`Comparing ${p.Ip} with ${pp.Ip}`);
                            return v.Ip !== pp.Ip;
                        }),
                        ...this.wsPlayers,
                    ]
                });
                break;
            case ItemType.COMMAND:
                this.wsCommands.push(v);
                this.setState({
                    [ItemType.COMMAND]: [
                        // @ts-ignore
                        ...this.state[ItemType.COMMAND].filter((pp: Player) => {
                            return v.Ip !== pp.Ip;
                        }),
                        ...this.wsCommands,
                    ],
                });
            break;
        }
    }
    constructor(props : {}) {
        super(props);
        this.api.SetWsOnMessage(this.processWsMessage);
    }

    addPlayer = (_player: Player) => {
        this.api.SendToWs(_player);
    };
    addCommand = (_command: Player) => {
        _command.itemType = 'command';
        this.api.SendToWs(_command);
    };

    changeFilter = (filter: Filter) => {
        this.setState({filter: filter});
    };

    changeFilterPart = (filter: Filter) =>{
        const updatedState= {...this.state.filter, ...filter}
        this.changeFilter(updatedState);
    }

    filterBySearch = (arr: FIXMELATER, term: FIXMELATER) => {
        if (term.trim() === '') return arr;
        // @ts-ignore
        return arr.filter(({Data}) => {
            const lowerLabel = Data.toLowerCase();
            return lowerLabel.indexOf(term.toLowerCase()) > -1;
        });
    };

    filterByState = () => {
        const {itemType, positions} = this.state.filter;
        let items = this.state[itemType];
        if ([ItemType.PLAYER, ItemType.COMMAND].includes(itemType)) {
            // @ts-ignore
            items = items.filter((p:Player)=>{
                    // @ts-ignore
                    return Object.entries(p.PossiblePos).some(([k,v])=>{
                        // @ts-ignore
                        return positions[k] &&  positions[k] === v;
                    });
                })
                .filter((p:Player)=>{
                    const pts = +p.MMR;
                    const {MMR} = this.state.filter;
                    return pts > MMR[0];
                })
                .filter((p:Player)=>{
                    const pts = +p.MMR;
                    const {MMR} = this.state.filter;
                    return pts < MMR[1];
                })

        }
        return items;
    };

    changeSearch = (e: { preventDefault: () => void; target: { value: FIXMELATER; }; }) => {
        e.preventDefault();
        this.setState({term: e.target.value});
    };

    render() {
        this.wsCommands = [];
        this.wsMsgs = [];
        this.wsPlayers =[];
        const {term, filter, message, player, command, loaded} = this.state;
        let stated = this.filterByState();
        const searched = this.filterBySearch(stated, term);
        return (
            // @ts-ignore
            <main className="app">
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline/>
                    <AppRoot player={player} command={command} message={message} filter={filter}
                             onMMRChange={this.changeFilterPart} onChangeSearch={this.changeSearch} term={term}
                             items={searched} stated={stated} onAddPlayer={this.addPlayer}
                             onAddCommand={this.addCommand}/>
                </ThemeProvider>
            </main>
        );
    }
}

