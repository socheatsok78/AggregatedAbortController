export declare class AggregatedAbortController extends AbortController {
    private signals;
    private registers;
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
