import './style.css'
import {printV} from "./print.ts";
import {Observable} from "./rxls.ts";

const o2$ = new Observable<any>(observer => {
    observer.next(1);
    observer.next("B");
    observer.error("no !");
    observer.complete();
});

const o$ = Observable.of<any>(1, 'B', 'C');

o2$.subscribe({
    next: (value: any) => {
        printV(value, 'green');
    },
    error: (error: any) => {
        printV('err: ' + error, 'red');
    },
    complete: () => {
        console.log('COMPLETE', 'blue')
    }
});

o$.subscribe((value: any) => {
    printV(value);
});
