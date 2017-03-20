class IPChecker {
  constructor(fetch) {
    this.fetch = fetch;
  }

  isGerman(ip) {
    const response = this.fetch(`https://ipapi.co/${ip}/country`)
    .then(response => {
      return response === 'DE'
    })
    .catch(this._error.bind(this));

    return response;
  }

  _error(error) {
    console.error('couldnt fetch country', error);
  }
}

export default IPChecker;
