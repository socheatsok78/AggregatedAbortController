"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatedAbortController = void 0;
const AggregatedAbortControllerSymbol = Symbol('AggregatedAbortController');
class AggregatedAbortController extends AbortController {
    constructor(items) {
        super();
        this[_a] = {
            signals: new Set(),
            registers: new WeakMap()
        };
        for (const item of items) {
            const signal = item instanceof AbortController
                ? item.signal
                : item instanceof AbortSignal
                    ? item
                    : undefined;
            if (signal !== undefined)
                this.attach(signal);
        }
    }
    /**
     * Attach a signal to this controller.
     */
    attach(signal) {
        const { signals, registers } = this[AggregatedAbortControllerSymbol];
        if (registers.has(signal)) {
            return false;
        }
        const handler = () => this.abort();
        signals.add(signal);
        registers.set(signal, handler);
        signal.addEventListener('abort', handler);
        return true;
    }
    /**
     * Detach a signal from this controller.
     */
    detach(signal) {
        const { signals, registers } = this[AggregatedAbortControllerSymbol];
        const handler = registers.get(signal);
        if (handler === undefined) {
            return false;
        }
        signal.removeEventListener('abort', handler);
        signals.delete(signal);
        registers.delete(signal);
        return true;
    }
    /**
     * Detach all signals from this controller.
     */
    detachAll() {
        const { signals } = this[AggregatedAbortControllerSymbol];
        for (const signal of signals) {
            this.detach(signal);
        }
    }
}
exports.AggregatedAbortController = AggregatedAbortController;
_a = AggregatedAbortControllerSymbol;
