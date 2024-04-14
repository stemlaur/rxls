import {Observable} from "./observables.ts";

export class Operation<T = void> {
    // used to declare should be skipped (for ex: filter)
    public skip: boolean = false;

    constructor(public value: T) {
    }
}

export type OperatorFn = (e: any) => Operation;

export function map(cb: (arg0: any) => any): OperatorFn {
    return (state: any) => {
        const value = cb(state.value);
        return new Operation(value);
    }
}

export function filter(predicate: (value: any) => boolean): OperatorFn {
    return (state: any) => {
        if (!predicate(state.value)) {
            state.skip = true;
        }
        return state;
    }
}

export function pipeFn<T>(target$: Observable<T>, ...pipeOperations: OperatorFn[]) {
    return new Observable<any>((observer) => {
        target$.subscribe({
            next: (value: any) => {
                try {
                    let state: Operation<any> = new Operation(value);
                    for (const pipeOperation of pipeOperations) {
                        state = pipeOperation(state);
                        if (state.skip) {
                            break;
                        }
                    }
                    if (state.skip) {
                        return;
                    }
                    observer.next(state.value);
                } catch (error) {
                    observer.error(error);
                }
            },
            error: (error: any) => observer.error(error),
            complete: () => observer.complete(),
        });
    });
}
