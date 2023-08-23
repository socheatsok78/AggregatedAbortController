type RegisteredHandler<K extends keyof AbortSignalEventMap> = (this: AbortSignal, ev: AbortSignalEventMap[K]) => any

export class AggregatedAbortController extends AbortController {
  private signals: Set<AbortSignal> = new Set()
  private registers: WeakMap<AbortSignal, RegisteredHandler<any>> = new WeakMap()

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
    if (this.registers.has(signal)) {
      return false
    }

    const handler = () => this.abort()
    this.signals.add(signal)
    this.registers.set(signal, handler)
    signal.addEventListener('abort', handler)
    return true
  }

  /**
   * Detach a signal from this controller.
   */
  public detach(signal: AbortSignal): boolean {
    const handler = this.registers.get(signal)
    
    if (handler === undefined) {
      return false
    }

    signal.removeEventListener('abort', handler)
    this.signals.delete(signal)
    this.registers.delete(signal)
    return true
  }

  /**
   * Detach all signals from this controller.
   */
  public detachAll(): void {
    for (const signal of this.signals) {
      this.detach(signal)
    }
  }
}
