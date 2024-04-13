interface Observer {
    next: (value: any) => void;
    error: (error: any) => void;
    complete: () => void;
}

export class Observable {
    _innerFn: (observer: Observer) => void;

    constructor(fn: (observer: Observer) => void) {
        this._innerFn = fn;
    }

    subscribe(observer: Partial<Observer>) {
        this._innerFn({
            next: observer?.next || function (_: any) {},
            error: observer?.error || function(_: any) {},
            complete: observer?.complete || function() {}
        });
    }
}
