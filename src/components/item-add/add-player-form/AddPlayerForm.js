import React, {Component} from "react";
import "./AddPlayerForm.css"

const ph = {
    Login:"Введите никнейм",
    Link:"Ссылка на телеграм или любой другой вид связи",
    MMR:"Введите свой ММР",
    PossiblePos: []
}
const MyInput = ({ name, user, placeholder, onChange, setInputRefToFocus, focusInput }) => {
    const value = user[name];
    return <input
        className="add-player-item"
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        // ref={(el) => { setInputRefToFocus(name,el); }}
        // onFocus={() => {focusInput(name)}}
    />
};

export default class AddPlayerForm extends Component {
    state = {
        inputRefsToFocus: {}
    };
    setInputRefToFocus = (name, el) => {
        this.setState({ inputRefsToFocus: { name: el } });
    };
    focusInput = (name) => {
        this.state.inputRefsToFocus[name].focus();
    };
    render(){
        const { onAddItem } = this.props;
        return(
            <form
                action={onAddItem}
                className="add_player_form input-group"
                onSubmit={onAddItem}
            >
                <MyInput name="UsrLogin" placeholder={ph.Login} setInputRefToFocus={this.setInputRefToFocus} focusInput={this.focusInput} {...this.props}/>
                <MyInput name ="UsrLink"  placeholder={ph.Link} {...this.props}/>
                <MyInput name ="UsrMMR" placeholder={ph.MMR} {...this.props}/>
                <button className="btn add-player-item" onClick={onAddItem}>Подтвердить</button>
            </form>
        )
    }
};
                // <div className="dropdown">
                //     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                //             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                //         Предпочитаемые позиции
                //     </button>
                //     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                //         <a className="dropdown-item" href="#">Action</a>
                //         <a className="dropdown-item" href="#">Action</a>
                //         <a className="dropdown-item" href="#">Action</a>
                //         {/*<select className="add-player-item form-select dropdown-item" multiple value={PossiblePos}>*/}
                //         {/*    <option value="1">Carry</option>*/}
                //         {/*    <option value="2">Midlane</option>*/}
                //         {/*    <option value="3">Offlane</option>*/}
                //         {/*    <option value="4">Soft support</option>*/}
                //         {/*    <option value="5">Hard support</option>*/}
                //         {/*</select>*/}
                //     </div>
                // </div>