export class AggregatedAbortController extends AbortController {
  private signals: WeakMap<AbortSignal, boolean> = new WeakMap<AbortSignal, boolean>()

  constructor(items: (AbortController | AbortSignal)[]) {
    super()
    for (const item of items) {
      const signal: AbortSignal | undefined = item instanceof AbortController
        ? item.signal
        : item instanceof AbortSignal
          ? item
          : undefined

      if (signal !== undefined) this.link(signal)
    }
  }

  public link(signal: AbortSignal): void {
    if (this.signals.has(signal)) return;
    this.signals.set(signal, true)
    signal.addEventListener('abort', () => this.abort())
  }
}
