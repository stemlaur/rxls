interface Observer<T> {
    next: (value: T) => void;
    error: (error: any) => void;
    complete: () => void;
}

export class Observable<T> {
    _innerFn: (observer: Observer<T>) => void;

    constructor(fn: (observer: Observer<T>) => void) {
        this._innerFn = fn;
    }

    subscribe(observer: Partial<Observer<T>> | ((value: T) => void)) {
        if(typeof observer === 'object') {
            this._innerFn({
                next: observer?.next || function (_: any) {
                },
                error: observer?.error || function (_: any) {
                },
                complete: observer?.complete || function () {
                },
            });
        } else if (typeof observer === 'function') {
            this._innerFn({
                next: observer,
                error: function (_: any) {
                },
                complete: function () {
                }
            });
        }
    }

    static of<T>(...theArgs: T[]): Observable<T> {
        return new Observable<T>(observer => {
            for (const a of theArgs) {
                observer.next(a);
            }
        });
    }

    pipe(...pipeOperations: any) {
        return pipeFn(this, pipeOperations)
    }
}

export function fromEvent(element: HTMLElement, type: string): Observable<Event> {
    return new Observable<Event>(observer => {
        if (!element) {
            throw new Error('it is not ready!');
        }
        element.addEventListener(type, (e: Event) => {
            observer.next(e);
        })
    });
}

export class Operation<T = void> {
    public complete: boolean = false;
    public skip: boolean = false;

    constructor(public value: T) {}
}

export const pipeFn = (target$: any, ...pipeOperations: any) => {
    return new Observable<any>((observer) => {
        target$.subscribe(
            async (value: any) => {
                try {
                    let state: Operation<any> = new Operation(value);
                    for (const pipeOperation of pipeOperations) {
                        const update = pipeOperation(state);
                        if (update.then) {
                            state = await update;
                        } else {
                            state = update;
                        }
                        if (state.skip || state.complete) {
                            break;
                        }
                    }
                    if (state.skip) {
                        return;
                    }
                    observer.next(state.value);
                    if (state.complete) {
                        observer.complete();
                    }
                } catch (error) {
                    observer.error(error);
                }
            },
            (error: any) => observer.error(error),
            () => observer.complete(),
        );
    });
};
