import React, {Component} from "react";
import "./AddPlayerForm.css"

export default class AddPlayerForm extends Component {
    state = {
        label:"Введите никнейм",
        Link:"Ссылка на телеграм или любой другой вид связи",
        MMR:0,
        PossiblePos: [],
        onSubmit: undefined
    }
    render(){
        const {label, Link, MMR, PossiblePos, onSubmit} = this.state;
        return(
            <form
                action={onSubmit}
                className="add_player_form input-group"
                onSubmit={onSubmit}
            >
                <input className="add-player-item" type="text" value={label}/>
                <input className="add-player-item"  type="text" value={Link}/>
                <input  className="add-player-item" type="text" value={MMR}/>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Предпочитаемые позиции
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Action</a>
                        {/*<select className="add-player-item form-select dropdown-item" multiple value={PossiblePos}>*/}
                        {/*    <option value="1">Carry</option>*/}
                        {/*    <option value="2">Midlane</option>*/}
                        {/*    <option value="3">Offlane</option>*/}
                        {/*    <option value="4">Soft support</option>*/}
                        {/*    <option value="5">Hard support</option>*/}
                        {/*</select>*/}
                    </div>
                </div>
                <button className="btn add-player-item">Подтвердить</button>
            </form>
        )
    }
};