class Parser {
  constructor(context, ipChecker) {
    this.context = context;
    this.ipChecker = ipChecker;
  }

  listen() {
    this.context.addEventListener('message', this.action.bind(this), false);
  }

  action(event) {
    switch (event.data.action) {
      case 'read':
        this.answer('read');
        break;
      case 'find':
        this.answer('find');
        break;
      default:
        this.answer('no registered action given');
    }
  }

  answer(message) {
    this.context.postMessage(message);
  }
}

export default Parser;
