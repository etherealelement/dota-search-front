import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import List from '../list';
import ItemStatusFilter from '../item-status-filter';
import ItemAdd from "../item-add";

import './app.css';
import GlobalCache from "../../services/Cache";
import DotaSearchService from "../../services/DotaSearchService";
const itemType = {COMMAND: "command", PLAYER: "player", MESSAGE: "message"};

export default class App extends Component{
    maxId=1;
    api = new DotaSearchService()
    FromUser = (v) => {
        return {
        label: v.Name,
        itemType: itemType.PLAYER,
        selected: false,
        key:this.maxId,
        ...v,
        id:this.maxId++,
    }};
    FromCommand = (v) => {
        return {
            label:v.ID,
            itemType: itemType.COMMAND,
            selected: false,
            key:this.maxId,
            ...v,
            id:this.maxId++,
        }};
    FromMessage = (v) => {
        console.log("got message", v);
        return {
            label:v.Data,
            itemType: itemType.MESSAGE,
            selected: false,
            key:this.maxId,
            ...v,
            id:this.maxId++,
        }};
    state = {
        appData: [],
        filter: itemType.MESSAGE,
        term: ''
        // cache: new GlobalCache()
    };

    newItem = (label) => { // switch filter: FromUser or FromCommand
        return {
            label: label,
            MMR: 100,
            PossiblePos: 5,
            itemType: this.state.filter,
            selected: false,
            key: this.maxId,
            id: this.maxId++
        }
    };
    addItem = (label)=>{
        this.setState({
            appData: [
            ...this.state.appData,
            this.newItem(label)
            ]
        });
    }
    deleteItem = (item_id)=>{
        this.setState({
            appData: this.state.appData.filter(({id}) => item_id !== id)
        })
    };

    selectItem = (id) => {
        this.toggleProp(id, 'selected')
    };

    changeFilter = (filter) =>{
        this.setState({filter: filter});
    };

    filterBySearch = (arr, term) => {
        if (term.trim() === '') return arr;
        return arr.filter(({label})=>{
            const lowerLabel = label.toLowerCase();
            return lowerLabel.indexOf(term.toLowerCase()) > -1;
        });
    };

    filterByState = (arr, state) => {
        switch (state){
            case 'command':
                return arr.filter((el)=>{return el.itemType === itemType.COMMAND});
            case 'player':
                return arr.filter((el)=>{return el.itemType === itemType.PLAYER});
            case 'message':
                return arr.filter((el)=>{return el.itemType === itemType.MESSAGE});
            default:
                return arr;
        }
    };

    changeSearch = (e) =>{
        e.preventDefault();
        this.setState({term: e.target.value});
    };

    toggleProp = (id, prop) =>{
        const {appData} = this.state;
        const idx = this.findElem(appData, 'id', id);
        const oldItem = this.state.appData[idx];
        const newItem = {...oldItem, [prop]:!oldItem[prop]};
        console.log("New item is: ", newItem);
        const newData = [
            ...appData.slice(0,idx),
            newItem,
            ...appData.slice(idx+1)
        ];
        this.setState({searchData: newData});
    }

    findElem = (arr, prop, val) => {
        return arr.findIndex((el) => {return el[prop] === val})
    };

    updateMessages(){
        this.api.getAllMessages()
            .then((msgs)=>{
                this.setState({
                    appData:[
                        ...msgs.map(this.FromMessage),
                    ]
                })
            });
    }
    constructor() {
        super();
        this.updateMessages();
    }

    render() {
        const {term, filter, appData} = this.state;
        let searched = Array.from( appData.values() );
        const players = this.filterByState(searched, itemType.PLAYER).length;
        const commands = this.filterByState(searched, itemType.COMMAND).length;
        const messages = this.filterByState(searched, itemType.MESSAGE).length;
        searched = this.filterByState(searched, filter);
        searched = this.filterBySearch(searched,term);
        return (
            <div className="app">
                <AppHeader players={players} commands={commands} messages={messages}/>
                <div className="top-panel d-flex">
                    <SearchPanel  onChangeSearch={this.changeSearch} term={term}/>
                    <ItemStatusFilter onChangeFilter={this.changeFilter} filter={filter}/>
                </div>
                <List
                    items={searched}
                    onSelectItem={this.selectItem}
                    // onDeleted={this.deleteItem}
                    // onToggleImportant={this.toggleImportant}
                />
                {/*<ItemAdd onAddItem={this.addItem} itemType={filter}/>*/}
            </div>
        );
    }
}

