import './Modal.css';
import {FIXMELATER} from "../../../shared/Constants";
import React from 'react';

const Modal = (props: { active: boolean; setActive: FIXMELATER; children: FIXMELATER; }) => {
        const {active, setActive, children} = props;
        const classname = active ? 'modal active' : 'modal';
        const classnameContent = active ? 'modal__content active' : 'modal';
    return (
            <div className={classname} onClick={() => setActive(false)}>
                <div className={classnameContent} onClick={e => {
                    e.stopPropagation();
                }}>
                    {children}
                </div>
            </div>
        );
}

export default Modal;