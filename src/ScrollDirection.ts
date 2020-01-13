type Direction = 'up' | 'down';

interface Dispatchable {
  dispatchEvent(event: Event): boolean;
}

interface ScrollDirectionOptions {
  attribute: string;
  direction: Direction;
  addAttributeTo: HTMLElement;
  element: HTMLElement;
  thresholdPixels: number;
  historyMaxAge: number;
  historyLength: number;
  eventTarget?: Dispatchable;
}

interface ScrollRecord {
  t: number;
  y: number;
}

class ScrollDirection {
  static defaultOptions: ScrollDirectionOptions = {
    attribute: 'data-scroll-direction',
    direction: 'down',
    addAttributeTo: document.documentElement,
    element: document.documentElement,
    thresholdPixels: 64,
    historyMaxAge: 512,
    historyLength: 32,
  };

  private _attribute: string;
  private _dir: Direction;
  private _el: HTMLElement;
  private _addAttributeTo: HTMLElement;
  private _thresholdPixels: number;

  private _history: ScrollRecord[];
  private _historyLength: number;
  private _historyMaxAge: number;

  private _pivot: ScrollRecord = { t: 0, y: 0 };
  private _event?: Event;
  private _eventTarget?: Dispatchable;
  private _listenOn: HTMLElement | Window;

  public constructor(options?: Partial<ScrollDirectionOptions>) {
    const opts = {
      ...ScrollDirection.defaultOptions,
      ...options,
    };
    this._attribute = opts.attribute;
    this._dir = opts.direction;
    this._el = opts.element;
    this._addAttributeTo = opts.addAttributeTo;
    this._thresholdPixels = opts.thresholdPixels;
    this._historyLength = opts.historyLength;
    this._historyMaxAge = opts.historyMaxAge;
    this._history = new Array<ScrollRecord>(this._historyLength);
    this._eventTarget = opts.eventTarget;
    this._listenOn = this._el === document.documentElement ? window : this._el;
  }

  public start(): void {
    this._pivot.y = this._el.scrollTop;
    this._addAttributeTo.setAttribute(this._attribute, this._dir);
    this._listenOn.addEventListener('scroll', this._handler);
  }

  public stop(): void {
    this._addAttributeTo.removeAttribute(this._attribute);
    this._listenOn.removeEventListener('scroll', this._handler);
  }

  private _handler = (event: Event): void => {
    this._event = event;
    requestAnimationFrame(this._tick);
  };

  private _tick = (): void => {
    if (!this._event) {
      return;
    }
    let y = this._el.scrollTop;
    const t = this._event.timeStamp;
    const furthest = this._dir === 'down' ? Math.max : Math.min;

    // Apply bounds to handle rubber banding
    const yMax = this._el.scrollHeight - this._el.clientHeight;
    y = Math.max(0, y);
    y = Math.min(yMax, y);

    // Update history
    this._history.unshift({ t, y });
    this._history.pop();

    // Are we continuing in the same direction?
    if (y === furthest(this._pivot.y, y)) {
      // Update "high-water mark" for current direction
      this._pivot = { t, y };
      return;
    }
    // else we have backed off high-water mark

    // Apply max age to find current reference point
    const cutoffTime = t - this._historyMaxAge;
    if (cutoffTime > this._pivot.t) {
      this._pivot.y = y;
      for (let i = 0; i < this._historyLength; i += 1) {
        if (!this._history[i] || this._history[i].t < cutoffTime) {
          break;
        }
        this._pivot.y = furthest(this._pivot.y, this._history[i].y);
      }
    }

    // Have we exceeded threshold?
    if (Math.abs(y - this._pivot.y) > this._thresholdPixels) {
      this._pivot = { t, y };
      this._dir = this._dir === 'down' ? 'up' : 'down';
      this._addAttributeTo.setAttribute(this._attribute, this._dir);

      if (this._eventTarget) {
        this._eventTarget.dispatchEvent(new CustomEvent(this._dir));
      }
    }
  };
}

export default ScrollDirection;
