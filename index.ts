export class AggregatedAbortController extends AbortController {
  constructor(items: (AbortController | AbortSignal)[]) {
    super()
    for (const item of items) {
      const signal: AbortSignal | undefined = item instanceof AbortController
        ? item.signal
        : item instanceof AbortSignal
          ? item
          : undefined
      if (signal) signal.addEventListener('abort', () => this.abort())
    }
  }
}
