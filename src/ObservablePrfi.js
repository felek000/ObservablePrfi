import { defaultOptions } from "./delautOptions";

class ObservablePrfi {
  state;
  eventName;
  history = [];
  selector;
  saveHistory;
  type;

  /**
   * @constructor
   * @param {defaultOptions} optionsInput
   */
  constructor(optionsInput) {
    const options = { ...defaultOptions, ...optionsInput };
    if (
      typeof options.selector !== "string" ||
      typeof options.eventName !== "string" ||
      typeof options.saveHistory !== "boolean" ||
      typeof options.type !== "string"
    ) {
      throw new Error("Wrong params given");
    }
    if (options.type === "any" && options.type === typeof options.value) {
      throw new Error(
        "Options.type and options type value mismatch. Change type to any"
      );
    }

    this.selector = document.querySelector(options.selector);
    this.eventName = options.eventName;
    this.saveHistory = options.saveHistory;
    this.type = options.type;
    this.setValue(options.value);
  }

  /**
   * @param {*} value - sets value to observable
   */
  setValue(value) {
    if (this.type !== "any" && (value, typeof value !== this.type)) {
      throw new TypeError("wrong type");
    }
    this.state = value;
    if (this.saveHistory) {
      this._pushToHistory(value);
    }
    this._eventUpdate();
  }

  /**
   *
   * @param {*} value - push to history
   * @private
   */
  _pushToHistory(value) {
    this.history.push(value);
  }

  /**
   *
   * @param {number} position - number to get from history
   * @returns {[]} - element in history
   */
  readFromHistory(position) {
    if (!position) {
      console.error("Position must be provided");
      return [];
    }
    if (this.history[position]) {
      return this.history[position];
    }
    return [];
  }

  /**
   *
   * @returns {[]} - all history
   */
  getHistoryFull() {
    return this.history;
  }

  /**
   *
   * @returns {value} - current value
   */
  getValue() {
    return this.state;
  }

  /**
   *
   * @param {number} position - position to restore value from history
   * @returns {boolean}
   */
  revFromHistory(position) {
    if (!position) {
      throw new Error("Position must be provided");
    }
    if (!this.saveHistory) {
      console.error("History set to false");
      return false;
    }
    this.state = this.readFromHistory(position);
    this._eventUpdate();
  }

  /**
   * @description assign event listner
   * @private
   */
  _eventUpdate() {
    this.selector.dispatchEvent(
      new CustomEvent(this.eventName, {
        bubbles: true,
        cancelable: true,
        detail: {
          value: this.state,
          history: this.getHistoryFull()
        }
      })
    );
  }
}

export default ObservablePrfi;
