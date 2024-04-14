import './style.css'
// @ts-ignore
import {printV} from "./print.ts";
import {everyXMilliseconds} from "./rxls/observables.ts";
import {filter, map} from "./rxls/operations.ts";

everyXMilliseconds(100).pipe(
    filter((value: any) => value % 2 == 0),
    map((value: any) => `${value} seconds`)).subscribe((value: any) => {
        document.querySelector('#bubbles')!.innerHTML = value;
    }
)
