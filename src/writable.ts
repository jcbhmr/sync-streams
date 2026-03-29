export class WritableSyncStream<T> {
  constructor(underlyingSink: UnderlyingSyncSink<T>, strategy?: QueuingStrategy<T>) {}

  get locked(): boolean {}

  abort(reason?: any): void {}
  close(): void {}
  getWriter(): WritableSyncStreamDefaultWriter<T> {}
}

export interface UnderlyingSyncSink<T> {
  start?: UnderlyingSyncSinkStartCallback<T>;
  write?: UnderlyingSyncSinkWriteCallback<T>;
  close?: UnderlyingSyncSinkCloseCallback;
  abort?: UnderlyingSyncSinkAbortCallback;
  type?: any;
}

export type UnderlyingSyncSinkStartCallback<T> = (
  controller: WritableSyncStreamDefaultController,
) => unknown;
export type UnderlyingSyncSinkWriteCallback<T> = (
  chunk: T,
  controller: WritableSyncStreamDefaultController,
) => unknown;
export type UnderlyingSyncSinkCloseCallback = () => unknown;
export type UnderlyingSyncSinkAbortCallback = (reason: any) => unknown;

export class WritableSyncStreamDefaultWriter<T> {
  #stream: WritableSyncStream<T>;
  constructor(stream: WritableSyncStream<T>) {
    this.#stream = stream;
  }

  get closed(): boolean {}

  get desiredSize(): number | null {}

  get ready(): true {
    return true;
  }

  abort(reason?: any): void {}

  close(): void {}

  releaseLock(): void {}

  write(chunk: T): void {}
}

export class WritableSyncStreamDefaultController {
  private constructor() {}

  get signal(): AbortSignal {}

  error(reason?: any): void {}
}

