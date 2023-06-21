import {useState} from 'react';
import {getId} from '../../../shared';
import {FIXMELATER} from "../../../shared/Constants";

export const TextInput = (props: { name: string; player: FIXMELATER; placeholder: FIXMELATER; onChange: FIXMELATER; }) => {
    const {name, player, placeholder, onChange} = props;
    const value = player[name];
    const [id] = useState(getId('text_'));
    return (    // @ts-ignore
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
