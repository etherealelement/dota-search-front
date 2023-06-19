import React, {useCallback, useState} from 'react';
import './AddPlayerForm.css';
import {addKeyId, isInDesiredForm, isValidHttpUrl, POSITIONS, QUINN_MMR, User} from '../../../shared';
import {CheckboxInput, TextInput} from '../../common/inputs'

const ph = {
    Login: 'Введите никнейм',
    Link: 'Ссылка на телеграм или любой другой вид связи',
    MMR: 'Введите свой ММР',
};

// @ts-ignore
const isFieldsInvalid = (user: User, setError:(string)=>void) => {
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

const AddPlayerForm = (props: { onAddItem: any; }) => {
    const [user, setUser] = useState(new User());
    const [error, setError] = useState('');
    const {onAddItem} = props;

    const onChange = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        // @ts-ignore
        const {type, name, checked, value} = e.target;
        if (type === 'checkbox') {
            setUser({...user, PossiblePos: {...user.PossiblePos, [name]: checked}});
        } else {        // @ts-ignore
            e.preventDefault();
            setUser({...user, [name]: value});
        }
    }, [user]);
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        // @ts-ignore
        e.preventDefault();
        if (isFieldsInvalid(user, setError)) return;
        setError('');
        const nUser = addKeyId(user, 'player_');
        onAddItem(nUser);
        setUser({
            ...new User(),
        });
    }, [user, onAddItem]);
    // @ts-ignore
    const inputs = ['Login', 'Link', 'MMR'].map(el => <TextInput name={el} placeholder={ph[el]} user={user}
                                                                 onChange={onChange}/>,
    );
    // @ts-ignore
    const checkboxes = POSITIONS.map(el => <CheckboxInput name={el} value={user.PossiblePos[el]} onChange={onChange}
                                                          childrn={el}/>,
    );
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
