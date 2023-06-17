import {useState} from 'react';
import {getId} from '../../../shared';
import {FIXMELATER} from "../../../shared/Constants";

export const TextInput = (props: FIXMELATER) => {
    const {name, user, placeholder, onChange} = props;
    const value = user[name];
    const [id] = useState(getId('text_'));
    return (
        <input
            name={name}
            className="flex-row input-user align-self-stretch"
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            id={id}
            key={id}
        />
    );
};
