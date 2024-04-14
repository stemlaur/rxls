import './style.css'
// @ts-ignore
import {printV} from "./print.ts";
// @ts-ignore
import {everyXMilliseconds, filter, map, Observable,} from "./rxls.ts";

// const c$ = Observable.of(1, 2, 3, 4, 5);

//
// const toto$ = pipeFn(c$, map((value: any) => {
//     return value.toUpperCase()
// }), map((value: any) => {
//     return value + ' test '
// }));
//
// toto$.subscribe(printV)

// const toto$ = c$.pipe(
//     filter((value: any) => value > 3),
//     map((value: any) => value + ' test')
// );

everyXMilliseconds(100).pipe(
    filter((value: any) => value % 2 == 0),
    map(value => `${value} seconds`)).subscribe((value => {
        document.querySelector('#bubbles')!.innerHTML = value;
    })
)
