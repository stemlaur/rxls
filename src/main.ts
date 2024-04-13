import './style.css'
import {printV} from "./print.ts";
import {Observable} from "./rxls.ts";

const o$ = new Observable(observer => {
    observer.next(1);
    observer.next("B");
    observer.error("no !");
    observer.complete();
});

o$.subscribe({
    next: (value: any) => {
        printV(value);
    },
    error: (error: any) => {
        printV('err: ' + error);
    },
    complete: () => {
        console.log('COMPLETE')
    }
});
