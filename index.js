"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatedAbortController = void 0;
class AggregatedAbortController extends AbortController {
    constructor(items) {
        super();
        for (const item of items) {
            const signal = item instanceof AbortController
                ? item.signal
                : item instanceof AbortSignal
                    ? item
                    : undefined;
            if (signal)
                signal.addEventListener('abort', () => this.abort());
        }
    }
}
exports.AggregatedAbortController = AggregatedAbortController;
