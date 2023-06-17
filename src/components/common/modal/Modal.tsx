import './Modal.css';
import {Component} from 'react';
import {FIXMELATER} from "../../../shared/Constants";

const Modal = (props: FIXMELATER) => {
        // @ts-ignore
        const {active, setActive, children} = props;
        const classname = active ? 'modal active' : 'modal';
        const classnameContent = active ? 'modal__content active' : 'modal';
    return (
        // @ts-ignore
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