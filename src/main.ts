import './style.css'
// @ts-ignore
import {printV} from "./print.ts";
// @ts-ignore
import {fromEvent, Observable} from "./rxls.ts";

const input = document.querySelector('#it')! as HTMLElement;
const div = document.querySelector('#bubbles')! as HTMLElement;

const c$ = fromEvent(input, 'keyup');

c$.subscribe((event: Event) => {
    const el = (event.target as HTMLInputElement);
    div.innerHTML = el.value.toUpperCase();
});
