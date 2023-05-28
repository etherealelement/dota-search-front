import "./Modal.css"
import React, {Component} from "react";
export default class Modal extends Component{
    render() {
        const {active, setActive, children} = this.props;
        const classname = active ? "modal active" : "modal";
        const classnameContent = active ? "modal__content active" : "modal";
        return (
            <div className={classname} onClick={()=>setActive(false)}>
                <div className={classnameContent} onClick={(e) => {
                    e.stopPropagation();
                }}>
                    {children}
                </div>
            </div>
        );
    }
}