"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatedAbortController = void 0;
class AggregatedAbortController extends AbortController {
    constructor(items) {
        super();
        this.signals = new WeakMap();
        for (const item of items) {
            const signal = item instanceof AbortController
                ? item.signal
                : item instanceof AbortSignal
                    ? item
                    : undefined;
            if (signal !== undefined)
                this.link(signal);
        }
    }
    link(signal) {
        if (this.signals.has(signal))
            return;
        this.signals.set(signal, true);
        signal.addEventListener('abort', () => this.abort());
    }
}
exports.AggregatedAbortController = AggregatedAbortController;
