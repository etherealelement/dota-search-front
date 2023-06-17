// @ts-ignore
import _uniqueId from 'lodash/uniqueId';
// @ts-ignore
import {cloneDeep} from 'lodash';

export const getId = (prefix = 'prefix_') => _uniqueId(prefix);
export const addId = (v:Object, prefix = 'prefix_')=>{
    const d = cloneDeep(v);
    d.id = _uniqueId(prefix);
    return d;
};

export const addKey = (v:Object, prefix = 'prefix_')=>{
    const d = cloneDeep(v);
    d.key = _uniqueId(prefix);
    return d;
};

export const addKeyId= (v:Object, prefix = 'prefix_')=>{
    const id =  _uniqueId(prefix);
    const d = cloneDeep(v);
    d.key = id;
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
