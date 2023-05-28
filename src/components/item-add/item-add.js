import React, {Component} from "react";
import './item-add.css'
import Constants from "../../shared/Constants";
import Modal from "../common/modal";
import AddPlayerForm from "./add-player-form/AddPlayerForm";

export default class ItemAdd extends Component{
    state = {
        props: {},
        modalActive: false
    };
    onPropsChange = (e)=>{
        this.setState({props:e.target.value});
    }
    setModalActive = (active) => {
        this.setState({modalActive: active})
    }
    render() {
        const {onAddItem, itemType} = this.props;
        const {props, modalActive} = this.state;
        if (itemType.itemType === Constants.MESSAGE) return;
        const onClick = (e)=>{
            e.preventDefault()
            onAddItem(props);
            this.setState({props:{}});
        };

        const ItemAddForm = () =>{
            const {itemType} = this.props;
            if (itemType === Constants.PLAYER)
                return new AddPlayerForm();
            return <div>{itemType}</div>;

        }
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
                    <ItemAddForm onAddItem={onAddItem} itemType={itemType}/>
                </Modal>
            </div>
        )
    }
}