import {ItemType} from "./Constants";

export class Positions {
    HardSupport: boolean = false
    SoftSupport: boolean = false
    Offlane: boolean = false
    Midlane: boolean = false
    Carry: boolean = false
}

export class User {
    Login: string = ''
    Link: string = ''
    MMR: string = ''
    PossiblePos: Positions = new Positions()
    itemType: string = ItemType.PLAYER
}