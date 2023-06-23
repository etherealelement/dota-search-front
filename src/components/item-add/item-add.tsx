import {useCallback, useState} from 'react';
import './item-add.css';
import {ItemType} from '../../shared';
import Modal from '../common/modal';
import AddPlayerForm from './add-player-form/AddPlayerForm';
import {FIXMELATER} from "../../shared/Constants";

// Контроллер модалки с кнопкой активации
export const ItemAdd = (props: { onAddPlayer: (q:FIXMELATER)=>void; itemType: FIXMELATER; onAddCommand: (q:FIXMELATER)=>void;}) => {
    const [modalActive, setModalActive] = useState(false);
    const {onAddPlayer, itemType, onAddCommand} = props;
    const onSubmitPlayer = useCallback((v: FIXMELATER) => {
        onAddPlayer(v);
        setModalActive(false);
    }, [onAddPlayer]);
    const onSubmitCommand = useCallback((v: FIXMELATER) => {
        onAddCommand(v);
        setModalActive(false);
    }, [onAddCommand]);
    // @ts-ignore
    if (itemType === ItemType.MESSAGE) return (<div/>);
    if (itemType === ItemType.COMMAND)
        return (
            <div className="col">
                <div className="item-add-form d-flex row">
                    <button
                        className="item-add-form btn btn-secondary btn-lg btn-block"
                        onClick={() => {
                            setModalActive(true);
                        }}
                    >
                        Find {ItemType.PLAYER}
                    </button>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <AddPlayerForm
                        onAddCommand={onSubmitCommand} isPlayer={false}
                    />
                </Modal>
            </div>
        );

    return (
        <div className="col">
            <div className="item-add-form d-flex row">
                <button
                    className="item-add-form btn btn-secondary btn-lg btn-block"
                    onClick={() => {
                        setModalActive(true);
                    }}
                >
                    Find {ItemType.COMMAND}
                </button>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <AddPlayerForm
                    onAddPlayer={onSubmitPlayer} isPlayer={true}
                />
            </Modal>
        </div>
    );
};
