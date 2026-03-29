export class TransformSyncStream<I, O> {
  constructor(
    transformer?: SyncTransformer<I, O>,
    writableStrategy?: QueuingStrategy<O>,
    readableStrategy?: QueuingStrategy<I>,
  ) {}

  get readable(): ReadableSyncStream<O> {}

  get writable(): WritableSyncStream<I> {}
}

export interface SyncTransformer<I, O> {
  start?: SyncTransformerStartCallback<I, O>;
  transform?: SyncTransformerTransformCallback<I, O>;
  flush?: SyncTransformerFlushCallback<O>;
  cancel?: SyncTransformerCancelCallback;
  readableType?: ReadableStreamType;
  writableType?: any;
}

export type SyncTransformerStartCallback<I, O> = (
  controller: TransformSyncStreamDefaultController<O>,
) => unknown;
export type SyncTransformerTransformCallback<I, O> = (
  chunk: I,
  controller: TransformSyncStreamDefaultController<O>,
) => unknown;
export type SyncTransformerFlushCallback<O> = (
  controller: TransformSyncStreamDefaultController<O>,
) => unknown;
export type SyncTransformerCancelCallback = (reason: any) => unknown;

export class TransformSyncStreamDefaultController<O> {
  private constructor() {}

  get desiredSize(): number | null {}

  enqueue(chunk: O): void {}
  error(reason?: any): void {}
  terminate(): void {}
}

export interface GenericTransformSyncStream<I, O> {
  readonly readable: ReadableSyncStream<O>;
  readonly writable: WritableSyncStream<I>;
}
