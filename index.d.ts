type RegisteredHandler<K extends keyof AbortSignalEventMap> = (this: AbortSignal, ev: AbortSignalEventMap[K]) => any;
declare const AggregatedAbortControllerSymbol: unique symbol;
export declare class AggregatedAbortController extends AbortController {
    [AggregatedAbortControllerSymbol]: {
        signals: Set<AbortSignal>;
        registers: WeakMap<AbortSignal, RegisteredHandler<any>>;
    };
    constructor(items: (AbortController | AbortSignal)[]);
    /**
     * Attach a signal to this controller.
     */
    attach(signal: AbortSignal): boolean;
    /**
     * Detach a signal from this controller.
     */
    detach(signal: AbortSignal): boolean;
    /**
     * Detach all signals from this controller.
     */
    detachAll(): void;
}
export {};
