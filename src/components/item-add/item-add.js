import React, {Component} from "react";
import './item-add.css'
import Constants from "../../shared/Constants";
import Modal from "../common/modal";
import AddPlayerForm from "./add-player-form/AddPlayerForm";

const DEFAULT_USER = {
    UsrLogin:"",
    UsrLink:"",
    UsrMMR:"",
    UsrPossiblePos: []
}

export default class ItemAdd extends Component{
    state = {
        ...DEFAULT_USER,
        modalActive: false
    };
    onChange = (e) => {
        e.preventDefault();
        const {type, name, checked, value} = e.target;
        const val = type === 'checkbox' ? checked : value;
        this.setState({ [name]: val});
    }
    setModalActive = (active) => {
        this.setState({modalActive: active})
    }
    render() {
        const {onAddItem, itemType} = this.props;
        const {modalActive} = this.state;
        if (itemType.itemType === Constants.MESSAGE)
            return;

        const  onClickUsr = (e)=>{
            e.preventDefault()
            onAddItem(this.state);
            this.setState({
                ...DEFAULT_USER,
                modalActive: false
            });
        };
        // const ItemAddForm = () =>{
        //     const { itemType } = this.props;
        //     switch (itemType) {
        //         case Constants.PLAYER:
        //             return 
        //     }
        //     return <div>{itemType}</div>;
        // }
        return(
            <div className="col">
                <div className="item-add-form d-flex row">
                    <button
                        className="item-add-form btn btn-secondary btn-lg btn-block"
                        onClick={()=>{this.setModalActive(true)}}
                    >
                        Add {itemType}
                    </button>
                </div>
                <Modal active={modalActive} setActive={this.setModalActive}>
                    <AddPlayerForm
                        onAddItem={onClickUsr}
                        onChange={this.onChange}
                        user={this.state}
                    />
                </Modal>
            </div>
        )
    }
}