import Promise from 'bluebird';

class File {
  constructor(reader) {
    this.reader = reader;
    this.reader.addEventListener('load', this._finished.bind(this), false);
    this.reader.addEventListener('error', this._error.bind(this), false);
  }

  read(file) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.resolve = resolve;
      self.reject = reject;
      self.reader.readAsText(file);
    });
  }

  _finished(event) {
    this.resolve(event.target.result);
  }

  _error(error) {
    this.reject(error);
  }
}

export default File;
