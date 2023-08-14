import {DetailedHTMLProps, HTMLAttributes} from "react";


export interface ModalMaterialProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    generalInfo: string;
    linkToConnection: string;
    averageMMR: string | number;
}