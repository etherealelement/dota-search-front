import {ItemType} from "./Constants";

const posToString ={
    5: 'Hard Support',
    4: 'Soft Support',
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
    HardSupport: boolean = false
    SoftSupport: boolean = false
    Offlane: boolean = false
    Midlane: boolean = false
    Carry: boolean = false

    static FromArray(a:number[]) {
        const positions = new Positions();
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
    Login: string = ''
    Link: string = ''
    MMR: string = ''
    PossiblePos: Positions = new Positions()
    itemType: string = ItemType.PLAYER
}