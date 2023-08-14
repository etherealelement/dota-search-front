import React, {useState} from "react";
import {FIXMELATER, ItemType} from "../../shared/Constants";
import Modal from "../common/modal";
import AddPlayerForm from "./add-player-form/AddPlayerForm";
import {ModalMaterial} from "../modal/modal-material";


export function CommandModal(props: { onClick: () => void, active: boolean, active1: (value: (((prevState: boolean) => boolean) | boolean)) => void, onAddCommand: (v: FIXMELATER) => void }) {
    // @ts-ignore
    const [activeState, setActive ] = useState<boolean>(false);
    return <div className="col">
        <div className="item-add-form d-flex row">
            <button
                className="item-add-form btn btn-secondary btn-lg btn-block"
                onClick={() => {
                    props.active
                    setActive(!activeState)
                }}
            >
                Find {ItemType.PLAYER}
            </button>
        </div>
        {activeState && <ModalMaterial
            generalInfo={"Общая информация"}
            linkToConnection={"Ссылка на телеграмм"}
            averageMMR={"Укажите ммр"}
        ></ModalMaterial>}
    </div>;
}

export function PlayerModal(props: { onClick: () => void, active: boolean, active1: (value: (((prevState: boolean) => boolean) | boolean)) => void, onAddPlayer: (v: FIXMELATER) => void }) {
    // @ts-ignore
    return <div className="col">
        <div className="item-add-form d-flex row">
            <button
                className="item-add-form btn btn-secondary btn-lg btn-block"
                onClick={props.onClick}
            >
                Find {ItemType.COMMAND}
            </button>
        </div>
        {props.active && <ModalMaterial
            generalInfo={"Общая информация"}
            linkToConnection={"Ссылка на телеграмм"}
            averageMMR={"Укажите ммр"}
        ></ModalMaterial>}
    </div>;
}