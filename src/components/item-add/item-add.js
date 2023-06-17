import React, {Component} from "react";
import './item-add.css'

export default class ItemAdd extends Component{
    state = {
        text: ""
    };
    onLabelChange = (e)=>{
        this.setState({text:e.target.value});
    }
    render() {
        const {onAddItem, itemType} = this.props;
        const onClick = (e)=>{
            e.preventDefault()
            onAddItem(this.state.text);
            this.setState({text:""});
        };
        return(
            <form className="item-add-form d-flex"
                  onSubmit={onClick}
            >
                <input type="text"
                       className="form-control input-group-text"
                       onChange={this.onLabelChange}
                       placeholder={`Add ${itemType}`}
                       value={this.state.text}
                />
                <button
                    className="btn btn-dark"
                    onClick={onClick}
                >
                    Add
                </button>
            </form>
        )
    }
}