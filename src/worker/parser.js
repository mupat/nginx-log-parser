import nginxParser from 'nginx-log-parser'

class Parser {
  constructor(context, ipChecker, file) {
    this.context = context;
    this.ipChecker = ipChecker;
    this.file = file;
    this.parser = nginxParser('$remote_addr $server_name $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"');
  }

  listen() {
    this.context.addEventListener('message', this._parse.bind(this), false);
  }

  answer(data) {
    this.context.postMessage(data);
  }

  _parse(event) {
    this.file.read(event.data)
    .then(fileContent => { //split content by new line to get single lines
      return fileContent.split("\n");
    })
    .then(content => { // filter out empty lines
      return content.filter(line => line.length > 0)
    })
    .then(content => { // parse line to nginx object
      return content.map(line => this.parser(line));
    })
    .then(content => { // give back parsed content
      this.answer(content);
    })
    .catch(error => {
      console.error('couldnt read file', error);
    })
  }
}

export default Parser;
