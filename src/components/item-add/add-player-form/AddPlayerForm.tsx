import React, {useCallback, useState} from 'react';
import './AddPlayerForm.css';
import {addKeyId, isInDesiredForm, isValidHttpUrl, POSITIONS, QUINN_MMR, Player} from '../../../shared';
import {CheckboxInput, TextInput} from '../../common/inputs'
import {CheckBoxKeys, TextInputKeys} from '../../../shared/Constants';

const ph = {
    Login: 'Введите никнейм',
    Link: 'Ссылка на телеграм или любой другой вид связи',
    MMR: 'Введите свой ММР',
};

const isFieldsInvalid = (user: Player, setError:(s:string)=>void) => {
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

const AddPlayerForm = (props: { onAddItem: (v:Player)=>void }) => {
    const [user, setUser] = useState(new Player());
    const [error, setError] = useState('');
    const {onAddItem} = props;

    const onChange = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        // @ts-ignore
        const {type, name, checked, value} = e.target;
        if (type === 'checkbox') {
            setUser({...user, PossiblePos: {...user.PossiblePos, [name]: checked}});
        } else {
            e.preventDefault();
            setUser({...user, [name]: value});
        }
    }, [user]);
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isFieldsInvalid(user, setError)) return;
        setError('');
        const nUser = addKeyId(user, 'player_') as Player;
        onAddItem(nUser);
        setUser({
            ...new Player(),
        });
    }, [user, onAddItem]);
    // @ts-ignore
    const inputs = ['Login', 'Link', 'MMR'].map(el => <TextInput name={el} placeholder={ph[el]} player={user} onChange={onChange} key={TextInputKeys[el]}/>);
    // @ts-ignore
    const checkboxes = POSITIONS.map(el => <CheckboxInput name={el} value={user.PossiblePos[el]} onChange={onChange} childrn={el} key={CheckBoxKeys[el]}/>);
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
