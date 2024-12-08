const getTimezoneOffset = () => {
  return new Date().getTimezoneOffset() * 60 * 1000;
};

export class DateUTC {
  private _timestamp: number;
  private _date: Date;

  constructor(timestamp?: number) {
    this._timestamp = timestamp || new Date().getTime();
    this._date = new Date(this._timestamp + getTimezoneOffset());
  }

  set timestamp(timestamp: number) {
    this._timestamp = timestamp;
    this._date = new Date(timestamp + getTimezoneOffset());
  }

  get timestamp(): number {
    return this._timestamp;
  }

  getDate(): number {
    return this._date.getDate();
  }

  getDay(): number {
    return this._date.getDay();
  }

  getMonth(): number {
    return this._date.getMonth();
  }

  getFullYear(): number {
    return this._date.getFullYear();
  }
}
