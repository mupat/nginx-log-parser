import React from 'react';
import LogTable from './logtable';

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.worker = this.props.worker;
    this.file = this.file.bind(this);
    this.state = {
      file_content: []
    }

    this.worker.addEventListener('message', (event) => this.setState({ file_content: event.data }), false);
  }

  file(event) {
    this.worker.postMessage(event.target.files[0]);
  }

  render() {
    return (
      <div>
        <h1> Nginx Log Parser </h1>
        <input type='file' onChange={this.file} />
        <LogTable file_content={this.state.file_content} />
      </div>
    )
  }
}

export default Visualizer;
