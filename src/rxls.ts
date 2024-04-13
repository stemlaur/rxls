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
