import type { WritableSyncStream } from "./writable.ts";

function initializeReadableSyncStream<T>(stream: ReadableSyncStream<T>): void {
  readableSyncStreamSetState(stream, "readable");
  readableSyncStreamSetReader(stream, undefined);
  readableSyncStreamSetStoredError(stream, undefined);
}

let readableSyncStreamGetState: <T>(
  stream: ReadableSyncStream<T>,
) => "readable" | "closed" | "errored";
let readableSyncStreamSetState: <T>(
  stream: ReadableSyncStream<T>,
  state: "readable" | "closed" | "errored",
) => void;
let readableSyncStreamGetReader: <T>(
  stream: ReadableSyncStream<T>,
) => ReadableSyncStreamDefaultReader<T> | ReadableSyncStreamBYOBReader<T> | undefined;
let readableSyncStreamSetReader: <T>(
  stream: ReadableSyncStream<T>,
  reader: ReadableSyncStreamDefaultReader<T> | ReadableSyncStreamBYOBReader<T> | undefined,
) => void;
let readableSyncStreamGetStoredError: <T>(stream: ReadableSyncStream<T>) => any;
let readableSyncStreamSetStoredError: <T>(stream: ReadableSyncStream<T>, error: any) => void;
export class ReadableSyncStream<T> {
  #controller: ReadableSyncStreamDefaultController<T> | ReadableByteSyncStreamController<T>;
  #disturbed: boolean = false;
  #reader: ReadableSyncStreamDefaultReader<T> | ReadableSyncStreamBYOBReader<T> | undefined;
  #state: "readable" | "closed" | "errored";
  #storedError: any | undefined;
  static {
    readableSyncStreamGetReader = (stream: ReadableSyncStream<any>) => stream.#reader;
    readableSyncStreamSetReader = (
      stream: ReadableSyncStream<any>,
      reader: ReadableSyncStreamDefaultReader<any> | ReadableSyncStreamBYOBReader<any> | undefined,
    ) => {
      stream.#reader = reader;
    };
    readableSyncStreamGetState = (stream: ReadableSyncStream<any>) => stream.#state;
    readableSyncStreamSetState = (
      stream: ReadableSyncStream<any>,
      state: "readable" | "closed" | "errored",
    ) => {
      stream.#state = state;
    };
    readableSyncStreamGetStoredError = (stream: ReadableSyncStream<any>) => stream.#storedError;
    readableSyncStreamSetStoredError = (stream: ReadableSyncStream<any>, error: any) => {
      stream.#storedError = error;
    };
  }
  constructor(underlyingSource?: UnderlyingSyncSource<T>, strategy?: QueuingStrategy<T>) {
    const underlyingSourceDict = {
      start: underlyingSource?.start,
      pull: underlyingSource?.pull,
      cancel: underlyingSource?.cancel,
      type: underlyingSource?.type,
      autoAllocateChunkSize: underlyingSource?.autoAllocateChunkSize,
    } as const;

    initializeReadableSyncStream(this);

    if (underlyingSourceDict.type === "bytes") {
        if 
    }
  }

  static from<T>(iterable: Iterable<T>): ReadableSyncStream<T> {}

  get locked(): boolean {}

  cancel(reason?: any): void {}

  getReader(options: ReadableStreamGetReaderOptions = {}): ReadableSyncStreamReader<T> {}

  pipeThrough<U>(
    transform: ReadableWritableSyncPair<U, T>,
    options: StreamPipeOptions = {},
  ): ReadableSyncStream<U> {}

  pipeTo(destination: WritableSyncStream<T>, options: StreamPipeOptions = {}): void {}

  tee(): [ReadableSyncStream<T>, ReadableSyncStream<T>] {}

  [Symbol.iterator](): IterableIterator<T> {}
  entries(): IterableIterator<[number, T]> {}
  forEach(callback: (value: T, index: number, stream: ReadableSyncStream<T>) => unknown): void {}
  keys(): IterableIterator<number> {}
  values(): IterableIterator<T> {}
}

export type ReadableSyncStreamReader<T> =
  | ReadableSyncStreamDefaultReader<T>
  | ReadableSyncStreamBYOBReader<T>;

export type ReadableWritableSyncPair<R, W> = {
  readable: ReadableSyncStream<R>;
  writable: WritableSyncStream<W>;
};

export interface UnderlyingSyncSource<T> {
  start?: UnderlyingSyncSourceStartCallback<T>;
  pull?: UnderlyingSyncSourcePullCallback<T>;
  cancel?: UnderlyingSyncSourceCancelCallback;
  type?: ReadableStreamType;
  autoAllocateChunkSize?: number;
}

export type ReadableSyncStreamController<T> =
  | ReadableSyncStreamDefaultController<T>
  | ReadableByteSyncStreamController<T>;

export type UnderlyingSyncSourceStartCallback<T> = (
  controller: ReadableSyncStreamController<T>,
) => unknown;
export type UnderlyingSyncSourcePullCallback<T> = (
  controller: ReadableSyncStreamController<T>,
) => unknown;
export type UnderlyingSyncSourceCancelCallback = (reason: any) => unknown;

export interface ReadableSyncStreamGenericReader<T> {
  readonly closed: boolean;
  cancel(reason?: any): void;
}

export class ReadableSyncStreamDefaultReader<T> implements ReadableSyncStreamGenericReader<T> {
  #stream: ReadableSyncStream<T>;
  constructor(stream: ReadableSyncStream<T>) {
    this.#stream = stream;
  }

  read(): ReadableStreamReadResult<T> {}

  releaseLock(): void {}

  get closed(): boolean {}
  cancel(reason?: any): void {}
}

export class ReadableSyncStreamBYOBReader<T> implements ReadableSyncStreamGenericReader<T> {
  #stream: ReadableSyncStream<T>;
  constructor(stream: ReadableSyncStream<T>) {
    this.#stream = stream;
  }

  read(
    view: ArrayBufferView<ArrayBuffer>,
    options: ReadableStreamBYOBReaderReadOptions = {},
  ): ReadableStreamReadResult<T> {}

  releaseLock(): void {}

  get closed(): boolean {}
  cancel(reason?: any): void {}
}

export class ReadableSyncStreamDefaultController<T> {
  private constructor() {}

  get desiredSize(): number | null {}

  close(): void {}
  enqueue(chunk?: T): void {}
  error(e?: any): void {}
}

export class ReadableByteSyncStreamController<T> {
  private constructor() {}

  get byobRequest(): ReadableStreamBYOBRequest | null {}

  get desiredSize(): number | null {}

  close(): void {}

  enqueue(chunk: ArrayBufferView<ArrayBuffer>): void {}

  error(e?: any): void {}
}
