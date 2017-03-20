import nginxParser from 'nginx-log-parser'

class Parser {
  constructor(context, ipChecker, file) {
    this.context = context;
    this.ipChecker = ipChecker;
    this.file = file;
    this.parser = nginxParser('$remote_addr $server_name $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"');
  }

  listen() {
    this.context.addEventListener('message', this.action.bind(this), false);
  }

  action(event) {
    switch (event.data.action) {
      case 'read':
        this._parse(event.data.file);
        break;
      case 'filter':
        this._filter(event.data.criteria);
        break;
      default:
        this.answer('no registered action given', false);
    }
  }

  answer(data, state = true) {
    this.context.postMessage({ success: state, content: data });
  }

  _parse(file) {
    this.file.read(file)
    .then(fileContent => {
      return fileContent.split("\n");
    })
    .then(content => {
      return content.map(line => this.parser(line));
    })
    .then(content => {
      this.content = content;
      this.answer(content);
    })
  }

  _filter(criteria) {
    const lines = !this.content ? [] : this.content.filter((line) => {
      return Object.keys(line)
        .map(key => line[key].includes(criteria))
        .reduce((last, current) => { return last ? last : current }, false);
    });
    this.answer(lines);
  }
}

export default Parser;
