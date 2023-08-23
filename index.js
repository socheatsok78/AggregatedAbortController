"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatedAbortController = void 0;
class AggregatedAbortController extends AbortController {
    constructor(items) {
        super();
        this.signals = new Set();
        this.registers = new WeakMap();
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
        if (this.registers.has(signal)) {
            return false;
        }
        const handler = () => this.abort();
        this.signals.add(signal);
        this.registers.set(signal, handler);
        signal.addEventListener('abort', handler);
        return true;
    }
    /**
     * Detach a signal from this controller.
     */
    detach(signal) {
        const handler = this.registers.get(signal);
        if (handler === undefined) {
            return false;
        }
        signal.removeEventListener('abort', handler);
        this.signals.delete(signal);
        this.registers.delete(signal);
        return true;
    }
    /**
     * Detach all signals from this controller.
     */
    detachAll() {
        for (const signal of this.signals) {
            this.detach(signal);
        }
    }
}
exports.AggregatedAbortController = AggregatedAbortController;
