import './style.css'
// @ts-ignore
import {printV} from "./print.ts";
// @ts-ignore
import {filter, fromEvent, map, Observable, Operation, pipeFn} from "./rxls.ts";

const c$ = Observable.of(1, 2, 3, 4, 5);

//
// const toto$ = pipeFn(c$, map((value: any) => {
//     return value.toUpperCase()
// }), map((value: any) => {
//     return value + ' test '
// }));
//
// toto$.subscribe(printV)

const toto$ = c$.pipe(
    filter((value: any) => value > 3),
    map((value: any) => value + ' test')
);

toto$.subscribe(printV)
