# AggregatedAbortController

A extendable `AbortController` with link aggregation with existing `AbortController` or `AbortSignal`.


## Install

```sh
npm install aggregated-abortcontroller
```

## Usage

```ts
import AggregatedAbortController from 'aggregated-abortcontroller';

// Create a new AbortController
const controller = new AbortController();

// Create a new AggregatedAbortController that aggregates the signal of the AbortController
const aggregatedController = new AggregatedAbortController([controller.signal]);

// Register a listener to the aggregated signal
aggregatedController.signal.addEventListener('abort', () => {
  console.log('aborted');
});

// Calling abort on the linked signal will also abort the aggregated signal
controller.abort(); // => 'aborted'

// But calling abort on the aggregated signal will not abort the linked signal
aggregatedController.abort();
```

## API

The `AggregatedAbortController` extends the `AbortController` and has the same API.

The following methods are added as extras to the `AggregatedAbortController`:

### `AggregatedAbortController`
```ts
const aggregatedController = new AggregatedAbortController(signals: (AbortSignal | AbortController)[])
```

### `AggregatedAbortController.attach()`
Attach a signal to this controller.
```ts
aggregatedController.attach(AbortSignal) // => boolean
```

### `AggregatedAbortController.detach()`
Detach a signal from this controller.
```ts
aggregatedController.detach(AbortSignal) // => boolean
```

### `AggregatedAbortController.detachAll()`
Detach all signals from this controller.
```ts
aggregatedController.detachAll() // => void
```

## License
Licensed under [MIT License](LICENSE).
