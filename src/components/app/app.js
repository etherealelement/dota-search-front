import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import List from '../list';
import ItemStatusFilter from '../item-status-filter';
import ItemAdd from "../item-add";
import './app.css';
import DotaSearchService from "../../services/DotaSearchService";
import Constants from "../../shared/Constants";

export default class App extends Component{
    maxId=1;
    state = {
        items: [],
        filter: {itemType: Constants.MESSAGE},
        term: '',
        loading: true,
        // cache: new GlobalCache()
    };
    api = new DotaSearchService()
    FromMessage = (v) => {
        console.log("got message", v);
        return {
            label:v.Data,
            itemType: Constants.MESSAGE,
            selected: false,
            key:this.maxId,
            id:this.maxId++,
            ...v,
        }};

    onMessagesLoaded = (msgs)=> {
        this.setState({
            items: [
                ...msgs.map(this.FromMessage),
            ],
            loading: false
        })
    }
    updateMessages(){
        this.api.getAllMessages()
            .then(this.onMessagesLoaded);
    }
    FromUser = (v) => {
        return {
        label: v.Name,
        itemType: Constants.PLAYER,
        selected: false,
        key:this.maxId,
        ...v,
        id:this.maxId++,
    }};
    FromCommand = (v) => {
        return {
            label:v.ID,
            itemType: Constants.COMMAND,
            selected: false,
            key:this.maxId,
            ...v,
            id:this.maxId++,
        }};

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
            items: [
            ...this.state.items,
            this.newItem(label)
            ]
        });
    }
    deleteItem = (item_id)=>{
        this.setState({
            items: this.state.items.filter(({id}) => item_id !== id)
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
        switch (state.itemType){
            case 'command':
                return arr.filter((el)=>{return el.itemType === Constants.COMMAND});
            case 'player':
                return arr.filter((el)=>{return el.itemType === Constants.PLAYER});
            case 'message':
                return arr.filter((el)=>{return el.itemType === Constants.MESSAGE});
            default:
                return arr;
        }
    };

    changeSearch = (e) =>{
        e.preventDefault();
        this.setState({term: e.target.value});
    };

    toggleProp = (id, prop) =>{
        const {items} = this.state;
        const idx = this.findElem(items, 'id', id);
        const oldItem = this.state.items[idx];
        const newItem = {...oldItem, [prop]:!oldItem[prop]};
        console.log("New item is: ", newItem);
        const newData = [
            ...items.slice(0,idx),
            newItem,
            ...items.slice(idx+1)
        ];
        this.setState({searchData: newData});
    }

    findElem = (arr, prop, val) => {
        return arr.findIndex((el) => {return el[prop] === val})
    }
    constructor() {
        super();
        this.updateMessages();
    }

    render() {
        const {term, filter, items, loading} = this.state;
        let searched = Array.from( items.values() );
        // TODO тяжелая конструкция, надо бы оптимизировать
        const players = this.filterByState(searched, {itemType:Constants.PLAYER}).length;
        const commands = this.filterByState(searched, {itemType:Constants.COMMAND}).length;
        const messages = this.filterByState(searched, {itemType:Constants.MESSAGE}).length;
        searched = this.filterByState(searched, filter);
        searched = this.filterBySearch(searched,term);
        return (
            <div className="app">
                <AppHeader players={players} commands={commands} messages={messages}/>
                <div className="top-panel d-flex">
                    <SearchPanel  onChangeSearch={this.changeSearch} term={term}/>
                    <ItemStatusFilter onChangeFilter={this.changeFilter} filter={filter.itemType}/>
                </div>
                <List
                    items={searched}
                    loading={loading}
                    // onSelectItem={this.selectItem}
                    filter={filter}
                    term={term}
                    onDeleted={this.deleteItem}
                    // onToggleImportant={this.toggleProp}
                />
                <ItemAdd onAddItem={this.addItem} itemType={filter.itemType}/>
            </div>
        );
    }
}

