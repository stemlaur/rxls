import './style.css'
// @ts-ignore
import {printV} from "./print.ts";
// @ts-ignore
import {fromEvent, Observable, Operation, pipeFn} from "./rxls.ts";

const c$ = Observable.of('foo', 'bar');

export const map = (cb: any) => (op: any) => {
    const value = cb(op.value);
    return new Operation(value);
};

const toto$ = pipeFn(c$, map((value: any) => {
    return value.toUpperCase()
}), map((value: any) => {
    return value + ' test '
}));

toto$.subscribe(printV)
