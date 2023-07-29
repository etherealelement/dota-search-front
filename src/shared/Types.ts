import {ItemType} from "./Constants";

const posToString ={
    5: 'HardSupport',
    4: 'SoftSupport',
    3: 'Offlane',
    2: 'Midlane',
    1: 'Carry',
}
const stringToPos ={
    'HardSupport': 5,
    'SoftSupport': 4,
    'Offlane': 3,
    'Midlane': 2,
    'Carry': 1,
}
export class Positions {
    HardSupport: boolean = true
    SoftSupport: boolean = true
    Offlane: boolean = true
    Midlane: boolean = true
    Carry: boolean = true

    static FromArray(a:number[]) {
        const positions = new Positions();
        Object.entries(positions).forEach(([k,v])=>{
            // @ts-ignore
            positions[k] = !v;
        });
        a.map(p=> { // @ts-ignore
            positions[posToString[p]] = true
        });
        return positions;
    }
    static ToArray(p: Positions) {
        const positions: number[] = [];
        Object.entries(p).map(([k,v])=>{// @ts-ignore
            if (v) {positions.push(stringToPos[k])}
        });
        return positions;
    }
}

export class Player {
    Data: string = ''
    Link: string = ''
    MMR: string = ''
    PossiblePos: Positions = new Positions()
    itemType: string = ItemType.PLAYER
    Ip: string =''
}

export class Filter {
    itemType: string = ItemType.MESSAGE
    positions: Positions = new Positions()
    MMR: number[] = [0, 12000]
}