import {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import List from '../list';
import ItemStatusFilter from '../item-status-filter';
import ItemAdd from '../item-add';
import './app.css';
import DotaSearchService from '../../services/DotaSearchService';
import {getId, ItemType} from '../../shared';
import {cloneDeep} from 'lodash';
import {FIXMELATER} from "../../shared/Constants";


export default class App extends Component {
    state = {
        items: [],
        [ItemType.MESSAGE]: [],
        [ItemType.PLAYER]: [],
        [ItemType.COMMAND]: [],
        filter: {itemType: ItemType.MESSAGE},
        term: '',
        loaded: {},
    };
    api = new DotaSearchService();

    constructor(props) {
        super(props);
        this.updateMessages();
    }

    FromMessage = v => {
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

    updateUsers = () => {
        this.api.getAllUsers()
            .then(this.onPlayersLoaded);
    };

    FilterChangeCallbacks = {
        [ItemType.MESSAGE]: this.updateMessages,
        [ItemType.COMMAND]: this.updateCommands,
        [ItemType.PLAYER]: this.updateUsers,
    };

    addItem = (_user: FIXMELATER) => {
        const {player} = this.state;
        this.api.postUser(cloneDeep(_user)).then(() => {
            if (player) {
                console.log('state is', player);
                this.setState({
                    player: [
                        // @ts-ignore
                        ...player,
                        _user,
                    ],
                });
            } else {
                console.log('no state, adding ', _user);
                this.setState({
                    user: [_user],
                });
            }
        });
    };

    deleteItem = (itemId: FIXMELATER) => {
        this.setState({
            items: this.state.items.filter(({id}) => itemId !== id),
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
        // @ts-ignore
        return arr.filter(({label}) => {
            const lowerLabel = label.toLowerCase();
            return lowerLabel.indexOf(term.toLowerCase()) > -1;
        });
    };

    filterByState = (state: { itemType: string; }) => this.state[state.itemType];

    changeSearch = e => {
        e.preventDefault();
        this.setState({term: e.target.value});
    };

    render() {
        const {term, filter, message, player, command, loaded} = this.state;
        let searched = this.filterByState(filter);
        searched = this.filterBySearch(searched, term);
        const status = loaded[filter.itemType];
        const players = player.length;
        const commands = command.length;
        const messages = message.length;
        return (
            <div className="app">
                <AppHeader players={players} commands={commands} messages={messages}/>
                <div className="top-panel d-flex">
                    <SearchPanel onChangeSearch={this.changeSearch} term={term}/>
                    <ItemStatusFilter onChangeFilter={this.changeFilter} filter={filter.itemType}/>
                </div>
                <List
                    items={searched}
                    loaded={status}
                    filter={filter}
                    term={term}
                    onDeleted={this.deleteItem}
                />
                <ItemAdd onAddItem={this.addItem} itemType={filter.itemType}/>
            </div>
        );
    }
}

