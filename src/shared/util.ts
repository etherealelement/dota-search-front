import {v4 as uuidv4} from 'uuid';
import {cloneDeep} from 'lodash';
const _uniqueId = (prefix: string) =>{
    return prefix + uuidv4();
}

export const getId = (prefix = 'prefix_') => _uniqueId(prefix);
export const addId = (v:Object, prefix = 'prefix_')=>{
    const d = cloneDeep(v);
    // @ts-ignore
    d.id = _uniqueId(prefix);
    return d;
};

export const addKey = (v:Object, prefix = 'prefix_')=>{
    const d = cloneDeep(v);
    // @ts-ignore
    d.key = _uniqueId(prefix);
    return d;
};

export const addKeyId= (v:Object, prefix = 'prefix_')=>{
    const id =  _uniqueId(prefix);
    const d = cloneDeep(v);
    // @ts-ignore
    d.key = id;
    // @ts-ignore
    d.id = id;
    return d;
};

export const isValidHttpUrl = (str:string) => {
    let url;

    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
};

export const isInDesiredForm = (str:string) => {
    const n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
};
