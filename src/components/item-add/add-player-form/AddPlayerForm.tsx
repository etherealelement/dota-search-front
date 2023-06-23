import React, {useCallback, useState} from 'react';
import './AddPlayerForm.css';
import {addKeyId, isInDesiredForm, isValidHttpUrl, POSITIONS, QUINN_MMR, Player} from '../../../shared';
import {CheckboxInput, TextInput} from '../../common/inputs'
import {CheckBoxKeys, TextInputKeys, PlayerPH as ph, CommandPH as cph} from '../../../shared/Constants';


export const isFieldsInvalid = (user: Player, setError:(s:string)=>void) => {
    if (!user.Login) {
        setError(`Please, specify your login.`);
        return true;
    }
    if (!isValidHttpUrl(user.Link)) {
        setError(`Bad link ${user.Link} please use valid http/https url.`);
        return true;
    }
    if (!isInDesiredForm(user.MMR)) {
        setError(`Bad MMR ${user.MMR} please use valid.`);
        return true;
    }
    if (Number(user.MMR) > QUINN_MMR) {
        setError(`Bad MMR ${user.MMR}, you are not Quinn, please be straight.`);
        return true;
    }
    if (!Object.values(user.PossiblePos).some((b:boolean)=>b)) {
        setError(`Please, specify preferable position.`);
        return true;
    }
    return false;
};

const AddPlayerForm = (props: { onAddPlayer: (v:Player)=>void; onAddCommand: (v:Player)=>void;  isPlayer: boolean}) => {
    const [player, setPlayer] = useState(new Player());
    const [command, setCommand] = useState(new Player());
    const [error, setError] = useState('');
    const {onAddPlayer, onAddCommand, isPlayer} = props;

    const onChange = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        // @ts-ignore
        const {type, name, checked, value} = e.target;
        if (type === 'checkbox') {
            if (isPlayer)
                setPlayer({...player, PossiblePos: {...player.PossiblePos, [name]: checked}});
            else
                setCommand({...command, PossiblePos: {...command.PossiblePos, [name]: checked}});
        } else {
            e.preventDefault();
            if (isPlayer)
                setPlayer({...player, [name]: value});
            else
                setCommand({...command, [name]: value});
        }
    }, [player,command, isPlayer]);
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let curItem = command;
        if (isPlayer) curItem = player;
        if (isFieldsInvalid(curItem, setError)) return;
        setError('');
        const nItem = addKeyId(curItem, 'player_') as Player;
        if (isPlayer) {
            onAddPlayer(nItem);
            setPlayer({
                ...new Player(),
            });
        } else{
            onAddCommand(nItem);
            setCommand({
                ...new Player(),
            });

        }
    }, [player,command, isPlayer]);
    let cur_ph = cph;
    if (isPlayer) {
        cur_ph = ph;
    }
    // @ts-ignore
    const inputs = ['Login', 'Link', 'MMR'].map(el => <TextInput name={el} placeholder={cur_ph[el]} player={isPlayer?player:command} onChange={onChange} key={TextInputKeys[el]}/>);
    // @ts-ignore
    const checkboxes = POSITIONS.map(el => <CheckboxInput name={el} value={(isPlayer?player:command).PossiblePos[el]} onChange={onChange} childrn={el} key={CheckBoxKeys[el]}/>);
    return (
        // @ts-ignore
        <form
            className="add_player_form input-group"
            onSubmit={onSubmit}
        >
            {inputs}
            <span className="add_player_item d-flex flex-row justify-content-around">
                {checkboxes}
            </span>
            <span className="field-validation-error">{error}</span>
            <button className="btn btn-primary add-player-item" onClick={onSubmit}>Подтвердить</button>
        </form>
    );
};
export default AddPlayerForm;
