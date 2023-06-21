import {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import List from '../list';
import ItemStatusFilter from '../item-status-filter';
import ItemAdd from '../item-add';
import './app.css';
import DotaSearchService from '../../services/DotaSearchService';
import {ItemType, getId, Player} from '../../shared';
import {cloneDeep} from 'lodash';
import {FIXMELATER, HttpStatusCode} from "../../shared/Constants";

export default class App extends Component {
    state = {
        [ItemType.MESSAGE]: [],
        [ItemType.PLAYER]: [],
        [ItemType.COMMAND]: [],
        filter: {itemType: ItemType.MESSAGE},
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

    updateMessages = () => {
        this.api.getAllMessages(false)
            .then(this.onMessagesLoaded);
    };

    updateCommands = () => {
        this.setState({
            loaded: {...this.state.loaded, [ItemType.COMMAND]: true},
        });
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

    addItem = (_player: Player) => {
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

    changeFilter = (filter: { itemType: string; }) => {
        const {loaded} = this.state;
        // @ts-ignore
        if (!loaded[filter.itemType])
            this.FilterChangeCallbacks[filter.itemType]();
        this.setState({filter});
    };

    filterBySearch = (arr: FIXMELATER, term: FIXMELATER) => {
        if (term.trim() === '') return arr;
        switch (this.state.filter.itemType) {
            case "player":
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

    filterByState = (state: { itemType: string; }) => this.state[state.itemType];

    changeSearch = (e: { preventDefault: () => void; target: { value: any; }; }) => {
        e.preventDefault();
        this.setState({term: e.target.value});
    };

    render() {
        const {term, filter, message, player, command, loaded} = this.state;
        let searched = this.filterByState(filter);
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
            <div className="app">
                <AppHeader players={players} commands={commands} messages={messages}/>
                <div className="top-panel d-flex">
                    <SearchPanel onChangeSearch={this.changeSearch} term={term}/>
                    <ItemStatusFilter onChangeFilter={this.changeFilter} filter={filter.itemType}/>
                </div>
                <List
                    items={searched}
                    loaded={status}
                    itemType={filter.itemType}
                    term={term}
                />
                <ItemAdd onAddItem={this.addItem} itemType={filter.itemType}/>
            </div>
        );
    }
}

