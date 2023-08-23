export declare class AggregatedAbortController extends AbortController {
    private signals;
    constructor(items: (AbortController | AbortSignal)[]);
    link(signal: AbortSignal): void;
}
