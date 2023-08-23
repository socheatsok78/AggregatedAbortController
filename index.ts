type RegisteredHandler<K extends keyof AbortSignalEventMap> = (this: AbortSignal, ev: AbortSignalEventMap[K]) => any

const AggregatedAbortControllerSymbol = Symbol('AggregatedAbortController')

export class AggregatedAbortController extends AbortController {
  [AggregatedAbortControllerSymbol] = {
    signals: new Set<AbortSignal>(),
    registers: new WeakMap<AbortSignal, RegisteredHandler<any>>()
  }

  constructor(items: (AbortController | AbortSignal)[]) {
    super()

    for (const item of items) {
      const signal: AbortSignal | undefined = item instanceof AbortController
        ? item.signal
        : item instanceof AbortSignal
          ? item
          : undefined

      if (signal !== undefined) this.attach(signal)
    }
  }

  /**
   * Attach a signal to this controller.
   */
  public attach(signal: AbortSignal): boolean {
    const { signals, registers } = this[AggregatedAbortControllerSymbol]
    if (registers.has(signal)) { return false }
    
    const handler = () => this.abort()
    signals.add(signal)
    registers.set(signal, handler)
    signal.addEventListener('abort', handler)
    return true
  }

  /**
   * Detach a signal from this controller.
   */
  public detach(signal: AbortSignal): boolean {
    const { signals, registers } = this[AggregatedAbortControllerSymbol]

    const handler = registers.get(signal)
    if (handler === undefined) { return false }

    signal.removeEventListener('abort', handler)
    signals.delete(signal)
    registers.delete(signal)
    return true
  }

  /**
   * Detach all signals from this controller.
   */
  public detachAll(): void {
    const { signals } = this[AggregatedAbortControllerSymbol]
    for (const signal of signals) { this.detach(signal) }
  }
}
