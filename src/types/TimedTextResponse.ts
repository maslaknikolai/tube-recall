// ---------- YouTube timedtext (fmt=json3) ----------
export interface TimedTextResponse {
  events: TimedTextEvent[];
}

export interface TimedTextEvent {
  /** Absolute start time of the block (milliseconds) */
  tStartMs: number;

  /** Duration of the block (milliseconds). May be missing for metadata events */
  dDurationMs?: number;

  /** Window/style identifiers (metadata) */
  wWinId?: number;
  wpWinPosId?: number;
  wsWinStyleId?: number;

  /** Internal event ID */
  id?: number;

  /** Flag that indicates continuation of the previous event (usually = 1) */
  aAppend?: number;

  /** Text segments (tokens or words). May be absent for non-text events */
  segs?: TimedTextSeg[];
}

export interface TimedTextSeg {
  /** Text fragment (usually a word, sometimes includes leading space) */
  utf8: string;

  /** Offset of the word start relative to tStartMs (milliseconds) */
  tOffsetMs?: number;

  /** ASR confidence score (0..1 or 0..100 depending on model) */
  acAsrConf?: number;
}
