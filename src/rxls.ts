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

    subscribe(observer: Partial<Observer<T>>) {
        this._innerFn({
            next: observer?.next || function (_: any) {},
            error: observer?.error || function(_: any) {},
            complete: observer?.complete || function() {}
        });
    }

    static of<T>(...theArgs: T[]): Observable<T> {
        return new Observable(observer => {
            for (const a of theArgs) {
                observer.next(a);
            }
        });
    }
}
