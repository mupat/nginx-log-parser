import React from 'react';

class NginxParser extends React.Component {
  constructor(props) {
    super(props);
    this.worker = this.props.worker;
    this.file = this.file.bind(this);

    this.worker.addEventListener('message', this.message.bind(this), false);
  }

  message(event) {
    console.log('Worker said: ', event.data);
  }

  file(event) {
    console.log(event.target.files[0]);
    this.worker.postMessage({action: 'read', file: event.target.files[0]});
  }

  render() {
    return (
      <div>
        <h1> Nginx Log Parser </h1>
        <input type='file' onChange={this.file} />
      </div>
    )
  }
}

export default NginxParser;
