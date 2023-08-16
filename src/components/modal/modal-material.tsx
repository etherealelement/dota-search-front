import React, {useRef, useState} from "react";
import {FC, memo} from 'react';
import styles from "./modal-material.module.css";
import {ModalMaterialProps} from "./modal-material.props";
import {Box, Button, Switch, TextField} from "@mui/material";
import cn from "classnames"

export const ModalMaterial: FC<ModalMaterialProps> = memo(({
                                                               generalInfo,
                                                               linkToConnection,
                                                               averageMMR
                                                           }: ModalMaterialProps): JSX.Element => {

    const [visiblePopup, setVisiblePopup] = useState<boolean>(true)
    const ref = useRef(null);
    
    
    console.log(ref.current)
    const togglePopup = (e:React.MouseEvent<HTMLDivElement>):void => {
        if (ref.current) setVisiblePopup(true)
        setVisiblePopup(item => !item)
    }


    return <div className={cn(styles.overlay, {
        [styles.overlay__hidden]: !visiblePopup
    })} onClick={togglePopup}>
        <div className={styles.modal} ref={ref} onClick={e => e.stopPropagation()}>
            <div className={styles.modal__inner}>
                <form className={styles.modal__form}>
                    <div className={styles.modal__form_box}>
                        <div className={styles.modal__box_general}>
                            <TextField id="outlined-basic" label={generalInfo} variant="outlined" fullWidth></TextField>
                        </div>
                        <div className={styles.modal__box_link}>
                            <TextField id="outlined-basic" label={linkToConnection} variant="outlined"
                                       fullWidth></TextField>
                        </div>
                        <div className={styles.modal__box_mmr}>
                            <TextField id="outlined-basic" label={averageMMR} variant="outlined" fullWidth></TextField>
                        </div>
                    </div>


                    <div className={styles.modal__form_switches}>
                            <label className={styles.modal__form_switches_item}>
                                <p>Soft support</p>
                                <Switch defaultChecked color="warning"></Switch>
                            </label>
                            <label className={styles.modal__form_switches_item}>
                                <p>Offline</p>
                                <Switch defaultChecked color="primary"></Switch>
                            </label>
                            <label className={styles.modal__form_switches_item}>
                                <p>Midline</p>
                                <Switch defaultChecked color="default"></Switch>
                            </label>
                            <label className={styles.modal__form_switches_item}>
                                <p>Carry</p>
                                <Switch defaultChecked color="error"></Switch>
                            </label>
                        <label className={styles.modal__form_switches_item}>
                            <p>Hardline</p>
                            <Switch defaultChecked color="default"></Switch>
                        </label>
                    </div>

                    <div className={styles.button__inner}>
                        <Button variant="contained">Подтвердить</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>;
})