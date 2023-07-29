import {FIXMELATER, ItemType} from "../../shared/Constants";
import Modal from "../common/modal";
import AddPlayerForm from "./add-player-form/AddPlayerForm";

export function CommandModal(props: { onClick: () => void, active: boolean, active1: (value: (((prevState: boolean) => boolean) | boolean)) => void, onAddCommand: (v: FIXMELATER) => void }) {
    // @ts-ignore
    return <div className="col">
        <div className="item-add-form d-flex row">
            <button
                className="item-add-form btn btn-secondary btn-lg btn-block"
                onClick={props.onClick}
            >
                Find {ItemType.PLAYER}
            </button>
        </div>
        <Modal active={props.active} setActive={props.active1}>
            <AddPlayerForm
                onAddCommand={props.onAddCommand} isPlayer={false}
            />
        </Modal>
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
        <Modal active={props.active} setActive={props.active1}>
            <AddPlayerForm
                onAddPlayer={props.onAddPlayer} isPlayer={true}
            />
        </Modal>
    </div>;
}