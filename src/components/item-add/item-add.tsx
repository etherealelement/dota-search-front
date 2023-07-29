import {useCallback, useState} from 'react';
import './item-add.css';
import {ItemType} from '../../shared';
import {FIXMELATER} from "../../shared/Constants";
import {CommandModal, PlayerModal} from "./Modals";

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
            // @ts-ignore
            <CommandModal onClick={() => {
                setModalActive(true);
            }} active={modalActive} active1={setModalActive} onAddCommand={onSubmitCommand}/>
        );

    return (
        // @ts-ignore
        <PlayerModal onClick={() => {
            setModalActive(true);
        }} active={modalActive} active1={setModalActive} onAddPlayer={onSubmitPlayer}/>
    );
};
